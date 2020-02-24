import { Injectable } from '@angular/core';
import Users from 'src/assets/users.json';
import { of } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users = Users.map(user => new User(user));

  constructor() { }

  get() {
    return of(this.users);
  }
}
