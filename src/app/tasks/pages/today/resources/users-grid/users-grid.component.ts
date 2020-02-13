import { Component, OnInit, Input } from '@angular/core';
import { UserDataSource } from 'src/app/core/data-sources/user-data-source/user.data-source';
import { User } from 'src/app/core/models/user/user';

@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  host: { class: 'c-usersGrid' }
})
export class UsersGridComponent implements OnInit {
  @Input() users: User[] = [];

  constructor(private userDataSource: UserDataSource) {}

  ngOnInit(): void {}
}
