import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { ConfirmDialogueComponent } from 'src/app/shared/components/confirm-dialogue/confirm-dialogue.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { DeletionService } from '../shared/services/deletion.service';
import { ListService } from '../shared/services/list.service';
import { RefreshStateService } from '../shared/services/refresh-state.service';
import { GamesListDTO } from '../shared/types/list-dto.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  loading = false;
  response: GamesListDTO = {
    currentPage: 0,
    games: [],
    totalItems: 0,
    totalPages: 0
  };
  pageSize = 10;
  page = 0;
  constructor(
    private listService: ListService,
    private errorHandler: ErrorHandlerService,
    private modalService: NgbModal,
    private deletionService: DeletionService,
    private refreshStateService: RefreshStateService,
  ) { }

  private handleError(error: any) {
    this.loading = false;
    this.errorHandler.showError(error);
  }

  private setResponseInGrid(next: GamesListDTO) {
    this.loading = false;
    this.response = next;
  }

  private subscribers(){
    const stateListener$ = (this.refreshStateService.state as Observable<number>).pipe(
      distinctUntilChanged(),
    ).subscribe(
      _ => {
        this.fetchData();
        this.refreshStateService.state = 0;
      },
    );
    this.subs.push(stateListener$);
  }

  private fetchData() {
    this.loading = true;
    this.listService.getListOfGames({ page: this.page, pageSize: this.pageSize }).subscribe(
      next => this.setResponseInGrid(next),
      error => this.handleError(error),
    );
  }

  ngOnInit(): void {
    this.fetchData();
    this.subscribers();
  }

  paginator(pageInfo: any) {
    this.page = pageInfo?.offset;
    this.fetchData();
  }

  deleteGame(id: string) {
    const modalRef = this.modalService.open(ConfirmDialogueComponent);
    modalRef.componentInstance.title = 'Removing Game';
    modalRef.componentInstance.message = 'Do you really want to delete the game?';
    modalRef.componentInstance.cancelButtonLabel = 'Cancel';
    modalRef.componentInstance.deleteButtonLabel = 'Yes';
    const modalCloseListener$ = modalRef.closed.pipe(
      filter(_ => modalRef.componentInstance.confirmed === true),
      tap(_ => this.loading = true),
      switchMap(_ => this.deletionService.deleteGame(id))
    ).subscribe(
      _ => {
        this.loading = true;
        this.page = 0;
        this.fetchData();
      },
      error => {
        this.loading = false;
        this.errorHandler.showError(error);
      }
    );
    this.subs.push(modalCloseListener$);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
