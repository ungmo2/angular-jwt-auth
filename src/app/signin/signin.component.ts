import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  template: `
    <div class="container">
      <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <form [formGroup]="signinForm" (ngSubmit)="signin()" novalidate>
          <div id="userid" class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-user"></i>
            </div>
            <input formControlName="userid" type="text" class="form-control input-lg" name="userid" placeholder="email">
          </div>

          <div class="alert-box">
            <em *ngIf="userid.errors?.required && userid.touched" class="text-danger">
              userid를 입력하세요!</em>
            <em *ngIf="userid.errors?.pattern && userid.touched" class="text-danger">
              userid를 이메일 형식에 맞게 입력하세요!</em>
          </div>

          <div id="password" class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-unlock-alt"></i>
            </div>
            <input formControlName="password" type="password" class="form-control input-lg" name="password" placeholder="password">
          </div>

          <div class="alert-box">
            <em *ngIf="password.errors?.required && password.touched" class="text-danger">
              password를 입력하세요!</em>
            <em *ngIf="password.errors?.pattern && password.touched" class="text-danger">
              password는 영문 또는 숫자로 입력하세요!</em>
            <em *ngIf="password.errors?.minlength && password.touched" class="text-danger">
              password는 4자리 이상으로 입력하세요!</em>
            <em *ngIf="password.errors?.maxlength && password.touched" class="text-danger">
              password는 10자리 이하로 입력하세요!</em>
          </div>

          <div *ngIf="message" class="alert alert-danger">{{message}}</div>

          <button [disabled]="signinForm.invalid" type="submit" class="btn btn-lg btn-success btn-block">Sign In</button>
        </form>

        <pre>{{ signinForm.value | json }}</pre>
        <pre>{{ signinForm.status }}</pre>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      background: -webkit-radial-gradient(0 100%, ellipse cover, rgba(104, 128, 138, .4) 10%, rgba(138, 114, 76, 0) 40%), linear-gradient(180deg, rgba(57, 173, 219, .25) 0, rgba(42, 60, 87, .4)), linear-gradient(135deg, #670d10, #092756);
    }

    .container {
      padding-top: 120px;
    }

    .alert {
      padding: 10px;
    }

    form {
      padding: 30px;
      background: #fff;
      border-radius: 5px;
    }

    .alert-box {
      min-height: 30px;
      padding: 5px 0;
    }

    button[type=submit] {
      margin-top: 30px;
      background-color: #00d1b2;
      border-color: transparent;
    }
  `]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      userid: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      password: ['', [Validators.required,
        Validators.pattern(/[a-zA-Z0-9]/),
        Validators.minLength(4),
        Validators.maxLength(10)
      ]]
    });
  }

  signin() {
    console.log('[payload]', this.signinForm.value);
    this.auth.signin(this.signinForm.value)
      .subscribe(
        () => this.router.navigate(['dashboard']),
        ({error}) => {
          console.log(error.message);
          this.message = error.message;
        }
      );
  }

  get userid() {
    return this.signinForm.get('userid');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
