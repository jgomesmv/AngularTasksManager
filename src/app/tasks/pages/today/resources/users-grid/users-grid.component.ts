import { Component, OnInit, Input } from '@angular/core';
import { UserDataSource } from 'src/app/core/data-sources/user-data-source/user.data-source';
import { User } from 'src/app/core/models/user/user';
import _ from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag
} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/core/models/task/task';
import { GridItem } from 'src/app/tasks/models/grid-item';
import { UserGridHelper } from 'src/app/tasks/helpers/user-grid-helper';
import { GridItemType } from 'src/app/tasks/enums/grid-item-type.enum';

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

  constructor() {}

  ngOnInit(): void {
    this.pendingTasksConnectedTo = this.users.map(
      user => `${user.id}_userTasks`
    );
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
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

  mapTasks(tasks: Task[]): GridItem[] {
    console.log(UserGridHelper.getUserGridItems(tasks));
    return UserGridHelper.getUserGridItems(tasks);
  }



  getGridItemStyles(gridItem: GridItem): any {
    const styles = {
      width: gridItem.width,
      height: gridItem.height ? gridItem.height : '100%'
    };

    return styles;
  }

  get GridItemType() {
    return GridItemType;
  }
}
