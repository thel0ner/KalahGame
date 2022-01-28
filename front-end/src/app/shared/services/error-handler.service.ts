import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastService: ToastService,
  ) { }

  public showError(error: HttpErrorResponse, forceMessage?: string): void {
    let message = '';
    if (error.status === 500) {
      message = 'Internal server error!'
    } else if (error.status === 400) {
      forceMessage ?
        message = forceMessage :
        error.error.message ?
          message = error.error.message :
          message = 'Bad request!'
    } else if (error.status === 401) {
      message = 'incorrect credentials';
    } else if (error.status === 403) {
      message = 'Access denied!';
    } else if (error.status === 0) {
      message = 'Network error!';
    } else {
      message = 'an unknown error ocured !'
    }
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: environment.toast.delay });
  }
}
