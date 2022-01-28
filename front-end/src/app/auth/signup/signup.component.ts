import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { GlobalToastService } from 'src/app/shared/services/global-toast.service';
import { Roles } from 'src/app/shared/types/roles.enum';
import { SignUpDTO } from 'src/app/shared/types/signup-dto.type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private globalToastService: GlobalToastService,
    private router: Router,
  ) { }

  private initForm() {
    this.signUpForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      roles: [[Roles.USER]]
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    if (this.loading === true) {
      return;
    }

    this.loading = true;
    const payload: SignUpDTO = this.signUpForm.getRawValue();
    this.authService.signUp(payload).subscribe(
      _ => {
        this.loading = false;
        this.globalToastService.success('you are successfully signed up!');
        this.router.navigate(['/auth/signin']);
      },
      error => {
        this.loading = false;
        this.errorHandler.showError(error);
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

}
