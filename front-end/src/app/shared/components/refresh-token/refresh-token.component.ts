import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, iif, Observable, of, Subscription } from 'rxjs';
import { filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { GlobalToastService } from '../../services/global-toast.service';
import { JWTService } from '../../services/jwt.service';
import { RefreshTokenService } from '../../services/refresh-token.service';
import { UserStateService } from '../../services/user-state.service';
import { SignInResponseDTO } from '../../types/sign-in-response-dto.type';
import { TokenControl } from './roken-control.abstract.class';
import { TokenDialogueComponent } from './token-dialogue/token-dialogue.component';

@Component({
  selector: 'app-refresh-token',
  templateUrl: './refresh-token.component.html',
  styleUrls: ['./refresh-token.component.scss']
})
export class RefreshTokenComponent extends TokenControl implements OnInit, OnDestroy {

  protected subs: Subscription[] = [];
  constructor(
    private userStateService: UserStateService,
    private modalService: NgbModal,
    private refreshTokenService: RefreshTokenService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private globalToastService: GlobalToastService,
    jwtService: JWTService,
  ) {
    super(jwtService);
  }

  private subscribers() {
    const userStateListener$ = (this.userStateService.state as Observable<boolean>).pipe(
      filter(userState => userState === true),
      switchMap(_ => this.monitorTiming$()),
      tap(_ => this.askToStayLonger()),
      takeWhile(state => state === false),
    ).subscribe();
    this.subs.push(userStateListener$);
  }

  private askToStayLonger() {
    const modalRef = this.modalService.open(TokenDialogueComponent);
    const modalCloseListener$ = modalRef.closed.pipe(
      switchMap(_ => iif(
        () => modalRef.componentInstance.shouldAskForRefreshToken,
        this.refreshTokenService.requestRefreshToken(this.refreshToken),
        of(null).pipe(
          tap(_ => {
            this.jwtService.destory();
            this.router.navigate(['/auth'])
          })
        )),
      ),
      takeWhile(next => next !== null)
    ).subscribe(
      next => {
        const temp: SignInResponseDTO = <SignInResponseDTO>this.jwtService.getInfo();
        temp.accessToken = <string>next?.accessToken;
        temp.refreshToken = <string>next?.refreshToken;
        this.jwtService.storeInfo(temp);
        this.globalToastService.success("Your session is extended!");
      },
      error => this.errorHandler.showError(error),
    );
    this.subs.push(modalCloseListener$);
  }

  ngOnInit(): void {
    this.getToken();
    this.subscribers();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
