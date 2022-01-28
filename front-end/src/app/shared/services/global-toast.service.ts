import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalToastService {

  constructor(
    private toastService: ToastService,
  ) { }

  standard(message: string) {
    this.toastService.show(message, { delay: environment.toast.delay });
  }

  success(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: environment.toast.delay });
  }

  danger(message: string) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: environment.toast.delay });
  }

}
