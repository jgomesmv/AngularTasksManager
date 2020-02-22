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
import { SelectListItem } from 'src/app/core/models/select-list-item/select-list-item';
import { GroupService } from 'src/app/core/services/group/group.service';

@Component({
  selector: 'user-task-grid',
  templateUrl: './user-task-grid.component.html',
  styleUrls: ['./user-task-grid.component.scss'],
  host: { class: 'c-usersGrid' }
})
export class UserTaskGridComponent implements OnInit {
  @Input() gridItems: GridItem[] = [];
  @Input() pendingTimelineItems: GridTimelineItem[] = [];
  gridItemsConnectedTo = [];

  @Input() groups: string[];
  groupSelectList: SelectListItem[] = [];

  nameFilterValue = '';
  groupFilterValue = '';

  constructor() {}

  ngOnInit(): void {
    this.gridItemsConnectedTo = this.gridItems.map(g => `${g.name}_gridItems`);
    this.setGroupSelectList();
  }

  drop(event: CdkDragDrop<any>) {
    const userName = _.replace(event.container.id, '_gridItems', '');
    const gridItemIndex = this.gridItems.findIndex(gi => gi.name === userName);
    const tasks = this.gridItems[gridItemIndex].gridTimelineItems
      .filter(gtli => gtli.data)
      .map(gtli => gtli.data);

    if (tasks && tasks.length < 6) {
      this.addToTargetContainer(event, gridItemIndex, tasks);

      this.removeFromPreviousContainer(event);
    } else {
      window.alert('A user can only have a maximum of 6 tasks per day');
    }
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

  volunteerNameFilterChanged(name: string) {
    this.nameFilterValue = name;
  }

  groupNameFilterChanged(groupName: string) {
    this.groupFilterValue = groupName;
  }

  private setGroupSelectList(): void {
    const selectList = [];
    this.groups.forEach(group =>
      selectList.push(
        new SelectListItem({
          text: group,
          value: group
        })
      )
    );
    this.groupSelectList = selectList;
  }

  private addToTargetContainer(
    event: CdkDragDrop<any>,
    nextIndex,
    tasks: Task[]
  ): void {
    tasks.push(event.previousContainer.data[event.previousIndex].data);
    this.gridItems[
      nextIndex
    ].gridTimelineItems = UserGridHelper.getUserGridTimelineItems(tasks);
  }

  private removeFromPreviousContainer(event: CdkDragDrop<any>): void {
    const previousContainer = event.previousContainer;
    if (previousContainer.id === 'pendingTasks') {
      previousContainer.data.splice(event.previousIndex, 1);
    } else {
      const userName = _.replace(previousContainer.id, '_gridItems', '');
      const gridItemIndex = this.gridItems.findIndex(
        gi => gi.name === userName
      );
      const tasks = this.gridItems[gridItemIndex].gridTimelineItems
        .filter(gtli => gtli.data)
        .map(gtli => gtli.data);

      tasks.splice(event.previousIndex, 1);
      this.gridItems[
        gridItemIndex
      ].gridTimelineItems = UserGridHelper.getUserGridTimelineItems(tasks);
    }
  }
}
