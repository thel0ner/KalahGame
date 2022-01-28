import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfirmDialogueComponent } from '../shared/components/confirm-dialogue/confirm-dialogue.component';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { JWTService } from '../shared/services/jwt.service';
import { UserStateService } from '../shared/services/user-state.service';
import { NewGameService } from './shared/services/new-game.service';
import { RefreshStateService } from './shared/services/refresh-state.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  constructor(
    private modalService: NgbModal,
    private jwtService: JWTService,
    private errorHandler: ErrorHandlerService,
    private userStateService: UserStateService,
    private router: Router,
    private newGameService: NewGameService,
    private refreshStateService: RefreshStateService,
  ) { }

  private canGoToNewGame(id: string) {
    const modalRef = this.modalService.open(ConfirmDialogueComponent);
    modalRef.componentInstance.title = 'Play game now!';
    modalRef.componentInstance.message = 'do you want to play game right now?';
    modalRef.componentInstance.cancelButtonLabel = 'Cancel';
    modalRef.componentInstance.deleteButtonLabel = 'Yes';
    const modalCloseListener$ = modalRef.closed.pipe(
      filter(_ => modalRef.componentInstance.confirmed === true),
    ).subscribe(
      _ => this.router.navigate([`/games/play/${id}`])
    );
    this.subs.push(modalCloseListener$);

  }

  ngOnInit(): void {
    this.userStateService.state = true;
  }

  logOut() {
    const modalRef = this.modalService.open(ConfirmDialogueComponent);
    modalRef.componentInstance.title = 'Signing out';
    modalRef.componentInstance.message = 'Are you sure about signing out of system?';
    modalRef.componentInstance.cancelButtonLabel = 'Cancel';
    modalRef.componentInstance.deleteButtonLabel = 'Yes';
    const modalCloseListener$ = modalRef.closed.pipe(
      filter(_ => modalRef.componentInstance.confirmed === true),
    ).subscribe(
      _ => {
        this.jwtService.destory();
        this.router.navigate(['/auth/']);
      }
    );
    this.subs.push(modalCloseListener$);
  }

  newGame() {
    this.newGameService.startNewGame().subscribe(
      next => {
        this.canGoToNewGame(next?.id);
        if (!this.router.url.includes('games/play')) this.refreshStateService.state = Math.random();
      },
      error => this.errorHandler.showError(error),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
