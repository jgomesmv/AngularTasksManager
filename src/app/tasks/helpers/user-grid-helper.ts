import moment from 'moment';
import _ from 'lodash';

import { Task } from 'src/app/core/models/task/task';
import { TaskTimelineType } from 'src/app/tasks/enums/task-timeline-type';
import { GridItem } from '../models/grid-item';
import { GridItemType } from '../enums/grid-item-type.enum';

export class UserGridHelper {
  static getUserGridItems(tasks: Task[]): GridItem[] {
    const tasksByStartsAtAsc: Task[] = _.orderBy(
      tasks,
      (task: Task) => {
        return task.startsAt.toDate();
      },
      ['asc']
    );

    const tasksByEndsAtAsc = _.orderBy(
      tasks,
      (task: Task) => {
        return task.endsAt.toDate();
      },
      ['asc']
    );
    const lastTask = tasksByEndsAtAsc.length ? tasksByEndsAtAsc.pop() : null;

    const userGridItems: GridItem[] = [];
    for (const task of tasksByStartsAtAsc) {
      const numberOfCrossTasks = this.getNumberOfCrossTasks(task, tasks);
      const heightPercentage = `${100 / (numberOfCrossTasks || 1)}%`;

      const timeLeftBefore = this.getTimeLeftBefore(task, tasks);
      const timeLeftBeforeMinutes = timeLeftBefore.asMinutes();
      if (timeLeftBeforeMinutes > 0) {
        const gridItemBefore = new GridItem({
          text: timeLeftBefore.humanize(),
          width: this.getDurationPercentage(timeLeftBeforeMinutes),
          height: null,
          type: GridItemType.timeGap,
          data: null
        });

        userGridItems.push(gridItemBefore);
      }

      const gridItemTask = new GridItem({
        text: task.name,
        width: this.getDurationPercentageBySartEnd(task.startsAt, task.endsAt),
        height: heightPercentage,
        type: GridItemType.task,
        data: task
      });

      userGridItems.push(gridItemTask);

      if (task.name === lastTask.name) {
        const timeLeftAfter = this.getTimeLeftAfter(task, tasks);
        const timeLeftAfterMinutes = timeLeftAfter.asMinutes();
        if (timeLeftAfterMinutes > 0) {
          const gridItemBefore = new GridItem({
            text: timeLeftAfter.humanize(),
            width: this.getDurationPercentage(timeLeftAfterMinutes),
            height: null,
            type: GridItemType.timeGap,
            data: null
          });

          userGridItems.push(gridItemBefore);
        }
      }
    }

    return userGridItems;
  }

  private static getTimeLeftBefore(
    currentTask: Task,
    tasks: Task[]
  ): moment.Duration {
    const previousTasks = _.orderBy(
      tasks,
      (task: Task) => {
        return task.endsAt.toDate();
      },
      ['asc']
    ).filter(task => task.endsAt.isSameOrBefore(currentTask.startsAt));

    let timeLeftBefore = moment.duration(0);
    if (previousTasks.length > 0) {
      const previousTask = previousTasks.pop();
      timeLeftBefore = moment.duration(
        currentTask.startsAt.diff(previousTask.endsAt)
      );
    } else {
      const dayStartTime = moment('08:00', 'HH:mm');
      timeLeftBefore = moment.duration(currentTask.startsAt.diff(dayStartTime));
    }

    return timeLeftBefore;
  }

  private static getTimeLeftAfter(
    currentTask: Task,
    tasks: Task[]
  ): moment.Duration {
    const afterTasks = _.orderBy(
      tasks,
      (task: Task) => {
        return task.startedAt.toDate();
      },
      ['asc']
    ).filter(task => task.startedAt.isAfter(currentTask.endsAt));

    let timeLeftAfter = moment.duration(0);
    if (afterTasks.length > 0) {
      const afterTask = afterTasks.pop();
      timeLeftAfter = moment.duration(
        currentTask.endsAt.diff(afterTask.startsAt)
      );
    } else {
      const dayEndTime = moment('18:00', 'HH:mm');
      timeLeftAfter = moment.duration(dayEndTime.diff(currentTask.endsAt));
    }

    return timeLeftAfter;
  }

  private static getDurationPercentage(durationMinutes: number): string {
    const dayDurationMinutes = 600;
    const durationPercentage = (durationMinutes / dayDurationMinutes) * 100;
    return `${durationPercentage}%`;
  }

  private static getDurationPercentageBySartEnd(
    start: moment.Moment,
    end: moment.Moment
  ): string {
    const duration = moment.duration(end.diff(start));
    const durationMinutes = duration.asMinutes();
    const durationPercentage = this.getDurationPercentage(durationMinutes);

    return `${durationPercentage}`;
  }

  private static getNumberOfCrossTasks(currentTask: Task, tasks: Task[]) {
    const crossTasks = tasks.filter(
      task =>
        (task.startsAt.isBefore(currentTask.startsAt) &&
          task.endsAt.isAfter(currentTask.endsAt)) ||
        task.startsAt.isBetween(currentTask.startsAt, currentTask.endsAt) ||
        task.endsAt.isBetween(currentTask.startsAt, currentTask.endsAt)
    );

    return crossTasks.length;
  }
}
