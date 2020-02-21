import { Injectable } from '@angular/core';
import { GridItem } from '../models/grid-item';
import { UserService } from 'src/app/core/services/user/user.service';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserGridHelper } from '../helpers/user-grid-helper';
import { TaskService } from 'src/app/core/services/task/task.service';
import { GridTimelineItem } from '../models/grid-timeline-item';

@Injectable({
  providedIn: 'root'
})
export class GridItemResolver implements Resolve<GridItem[]> {
  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {}

  resolve(): Observable<any> {
    return forkJoin([
      this.userService.get(),
      this.taskService.getPendingTasks()
    ]).pipe(
      map(result => {
        return {
          gridItems: result[0].map(user => {
            const gridItem = new GridItem({});
            gridItem.name = user.name;
            gridItem.areas = user.areas;
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
          })
        };
      })
    );
  }
}
