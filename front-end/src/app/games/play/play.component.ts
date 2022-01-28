import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, from, of, Subscription } from 'rxjs';
import { debounce, debounceTime, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Game } from '../shared/types/game-dto.type';
import { MoveRecorderService } from './services/record-move.service';
import { SeedsDistributerService } from './services/seeds-distributer.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private chosenPit!: number;
  message: string = 'go ahead and pick a pit!';
  gameData!: Game;
  constructor(
    private activatedRoute: ActivatedRoute,
    private seedsDistributerService: SeedsDistributerService,
    private moveRecorderService: MoveRecorderService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  private recordPlayerMove() {
    const gameListener$ = from(this.seedsDistributerService.distributeSeeds(this.gameData, this.chosenPit)).pipe(
      tap(result => this.gameData = result),
      switchMap(_ => this.moveRecorderService.recordMove(this.gameData.id, this.chosenPit)),
      tap(response => {
        if (response.canPlayerPlayAgain) this.gameData = response.game;
      }),
      filter(response => response.canPlayerPlayAgain === false),
      tap(response => {
        if (response.game.status === true) this.gameData = response.game;
      }),
      filter(response => response.game.status === false),
    ).subscribe(
      response => {
        this.message = `now machine should play!`;
        response.chosenPitsByMachine.forEach(chosenPitByMachine => {
          let gameHolder: Game = this.gameData;
          setTimeout(
            () => {
              this.seedsDistributerService.updateByChosenPitOnBehalfOfMachine(
                chosenPitByMachine,
                gameHolder
              ).then(
                result => {
                  const temp = Object.assign({}, result);
                  temp.playerPits = result.machinePits;
                  temp.playerStore = result.machineStore;
                  temp.machinePits = result.playerPits;
                  temp.machineStore = result.playerStore;
                  gameHolder = temp;
                }
              );
            }, 1400
          )
          console.log('round one');
          
        });
        this.gameData = response.game;
        this.message = 'your turn';
      },
      error => {
        this.message = 'operation failed!';
        this.errorHandlerService.showError(error);
      }
    );
    this.subs.push(gameListener$);
  }

  private subscribers() {

    const routeListener$ = this.activatedRoute.data.subscribe(
      next => {
        this.gameData = next[0];
      }
    );
    this.subs.push(routeListener$);
  }

  ngOnInit(): void {
    this.subscribers();
  }

  listenForChosenPit($event: number) {
    this.chosenPit = $event;
    this.recordPlayerMove();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
