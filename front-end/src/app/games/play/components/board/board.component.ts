import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/games/shared/types/game-dto.type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() gameData!:Game;
  @Output() chosenPit: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  listenForPlayersSelections($event: number){
    this.chosenPit.emit($event);
  }

}
