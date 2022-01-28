import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { GlobalToastService } from 'src/app/shared/services/global-toast.service';
import { JWTService } from 'src/app/shared/services/jwt.service';
import { SigninDTO } from 'src/app/shared/types/signin-dto.type';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorHandler:ErrorHandlerService,
    private globalToastService: GlobalToastService,
    private jwtService: JWTService,
    private router: Router,
  ) { }

  private initForm(): void {
    this.signInForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  signIn() {
    if(this.signInForm.invalid){
      this.signInForm.markAllAsTouched(); 
      return;
    }
    if(this.loading === true) return;
    this.loading = true;
    const payload:SigninDTO = this.signInForm.getRawValue();
    this.authService.signin(payload).subscribe(
      next => {
        this.loading = false;
        this.globalToastService.success('you are successfully logged in');
        this.jwtService.storeInfo(next);
        this.router.navigate(['/games']);
      },
      error => {
        this.loading = false;
        this.errorHandler.showError(error,'Wrong username or password');
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

}
