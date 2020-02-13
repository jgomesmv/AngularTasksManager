import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataSource {
  private usersSubject = new BehaviorSubject<User[]>(null);

  constructor(private userService: UserService) { }

  connect(): Observable<User[]> {
    if (!this.usersSubject.value) {
      this.getUsers();
    }

    return this.usersSubject.asObservable().pipe(
      skipWhile((users) => {
        return users ? false : true;
      })
    );
  }

  disconnect(): void {
    this.usersSubject.complete();

    this.usersSubject = new BehaviorSubject<User[]>(null);
  }

  updateUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  addUser(user: User): void {
    const users = this.usersSubject.value;
    users.push(user);
    this.updateUsers(users);
  }

  updateUser(user: User): void {
    const users = this.usersSubject.value.filter(u => u.id !== user.id);
    users.push(user);
    this.updateUsers(users);
  }

  removeUser(user: User): void {
    const users = this.usersSubject.value.filter(u => u.id !== user.id);
    this.updateUsers(users);
  }

  removeAllUsers(): void {
    this.updateUsers([]);
  }

  getUsers(): void {
    this.userService.get().subscribe(
      (users) => {
        this.updateUsers(users);
      },
      (error) => {
        this.usersSubject.error(error);
      }
    );
  }
}
