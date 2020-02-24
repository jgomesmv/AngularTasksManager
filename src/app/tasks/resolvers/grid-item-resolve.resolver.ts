import { Injectable } from '@angular/core';
import { GridItem } from '../models/grid-item';
import { UserService } from 'src/app/core/services/user/user.service';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserGridHelper } from '../helpers/user-grid-helper';
import { TaskService } from 'src/app/core/services/task/task.service';
import { GridTimelineItem } from '../models/grid-timeline-item';
import { GroupService } from 'src/app/core/services/group/group.service';

@Injectable({
  providedIn: 'root'
})
export class GridItemResolver implements Resolve<GridItem[]> {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private groupService: GroupService
  ) {}

  resolve(): Observable<any> {
    return forkJoin([
      this.userService.get(),
      this.taskService.getPendingTasks(),
      this.groupService.get()
    ]).pipe(
      map(result => {
        return {
          gridItems: result[0].map(user => {
            const gridItem = new GridItem({});
            gridItem.name = user.name;
            gridItem.email = user.email;
            gridItem.areas = user.areas;
            gridItem.groups = user.groups;
            gridItem.gridTimelineItems = UserGridHelper.getUserGridTimelineItems(
              user.tasks
            );
            return gridItem;
          }),
          pendingTimelineItems: result[1].map(pendingTask => {
            const gridTimelineItem = new GridTimelineItem({});
            gridTimelineItem.name = pendingTask.name;
            gridTimelineItem.data = pendingTask;
            return gridTimelineItem;
          }),
          groups: result[2]
        };
      })
    );
  }
}
