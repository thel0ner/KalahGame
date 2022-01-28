import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogueComponent } from './components/confirm-dialogue/confirm-dialogue.component';
import { RefreshTokenComponent } from './components/refresh-token/refresh-token.component';
import { TokenDialogueComponent } from './components/refresh-token/token-dialogue/token-dialogue.component';



@NgModule({
  declarations: [
    ToastComponent,
    ConfirmDialogueComponent,
    RefreshTokenComponent,
    TokenDialogueComponent,
  ],
  exports: [
    ToastComponent,
    ConfirmDialogueComponent,
    RefreshTokenComponent,
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class SharedModule { }
