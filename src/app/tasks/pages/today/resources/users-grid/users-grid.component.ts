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
import { GridTimelineItemType } from 'src/app/tasks/enums/grid-item-type.enum';
import { GridTimelineItem } from 'src/app/tasks/models/grid-timeline-item';

@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  host: { class: 'c-usersGrid' }
})
export class UsersGridComponent implements OnInit {
  @Input() gridItems: GridItem[] = [];
  @Input() pendingTimelineItems: GridTimelineItem[] = [];

  gridItemsConnectedTo = [];

  constructor() {}

  ngOnInit(): void {
    this.gridItemsConnectedTo = this.gridItems.map(g => `${g.name}_gridItems`);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const userName = _.replace(event.container.id, '_gridItems', '');
      const gridItemIndex = this.gridItems.findIndex(gi => gi.name === userName);
      const tasks = this.gridItems[gridItemIndex].gridTimelineItems.filter(gtli => gtli.data).map(gtli => gtli.data);
      tasks.push(event.previousContainer.data[event.previousIndex].data);
      this.gridItems[gridItemIndex].gridTimelineItems = UserGridHelper.getUserGridTimelineItems(tasks);
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

  getGridItemStyles(gridItem: GridTimelineItem): any {
    const styles = {
      width: gridItem.width,
      height: gridItem.height ? gridItem.height : '100%'
    };

    return styles;
  }

  get GridItemType() {
    return GridTimelineItemType;
  }
}
