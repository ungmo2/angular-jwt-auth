import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

interface Header {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="jumbotron">
      <div class="container">
        <h1>{{ header.title }}</h1>
        <p>{{ header.subtitle }}</p>
        <p>{{userid}}</p>
        <a class="btn btn-default" (click)="signout()">Signout</a>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <h2>Users infomation</h2>
        <div class="table-responsive">
          <table class="table table-bordred table-hover">
            <thead>
              <th>#</th>
              <th>ID</th>
              <th>Admin</th>
            </thead>
            <tbody>
              <tr *ngFor="let user of users; let i = index">
                <td>{{i}}</td>
                <td>{{user.userid}}</td>
                <td>{{user.admin}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  header: Header;
  userid: string;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    // static data 취득
    this.header = this.route.snapshot.data as Header;
    // 토큰에서 사용자 아이디 취득
    this.userid = this.authService.getUserid();

    // 사용자 정보 취득
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  signout() {
    this.authService.signout();
    this.router.navigate(['signin']);
  }
}
