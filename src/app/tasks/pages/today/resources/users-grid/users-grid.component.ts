import { Component, OnInit, Input } from '@angular/core';
import { UserDataSource } from 'src/app/core/data-sources/user-data-source/user.data-source';
import { User } from 'src/app/core/models/user/user';
import _ from 'lodash';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task/task';

@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  host: { class: 'c-usersGrid' }
})
export class UsersGridComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() pendingTasks: Task[] = [];

  pendingTasksConnectedTo = [];

  hours = _.range(8, 18, 1);
  minutes = _.range(1, 60, 1);

  constructor() {}

  ngOnInit(): void {
    this.pendingTasksConnectedTo = this.users.map(user => `${user.id}_userTasks`);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<any>) {
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
