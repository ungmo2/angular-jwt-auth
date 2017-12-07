import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { AuthService } from './auth.service';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('Authorization', this.auth.getToken());
      // .set('Authorization', `Bearer ${this.auth.getToken()}`);

    return this.http.get<User[]>(`${this.appUrl}/users`, { headers })
      .shareReplay();
  }

}
