import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDataSource } from 'src/app/core/data-sources/user-data-source/user.data-source';
import { User } from 'src/app/core/models/user/user';
import { PendingTaskDataSource } from 'src/app/core/data-sources/pending-task-data-source/pending-task-data-source.service';
import { Task } from 'src/app/core/models/task/task';

@Component({
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss']
})
export class TodayPage implements OnInit, OnDestroy {
  users: User[] = [];
  pendingTasks: Task[] = [];

  constructor(
    private userDataSource: UserDataSource,
    private pendingTaskDataSource: PendingTaskDataSource
  ) {}

  ngOnInit(): void {
    this.userDataSource.connect().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log(error);
      }
    );

    this.pendingTaskDataSource.connect().subscribe(
      pendingTasks => {
        this.pendingTasks = pendingTasks;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.userDataSource.disconnect();
  }
}
