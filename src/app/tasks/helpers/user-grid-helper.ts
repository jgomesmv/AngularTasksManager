import moment from 'moment';
import _ from 'lodash';

import { Task } from 'src/app/core/models/task/task';
import { GridTimelineItem } from '../models/grid-timeline-item';
import { GridTimelineItemType } from '../enums/grid-item-type.enum';

export class UserGridHelper {
  static getUserGridTimelineItems(tasks: Task[]): GridTimelineItem[] {
    const tasksByStartsEndsAtAsc: Task[] = _.orderBy(
      tasks,
      (task: Task) => {
        return [task.startsAt.toDate(), task.endedAt.toDate()];
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
    const lastTask = _.last(tasksByEndsAtAsc);

    const userGridItems: GridTimelineItem[] = [];
    for (const [index, task] of tasksByStartsEndsAtAsc.entries()) {
      const numberOfCrossTasks = this.getNumberOfCrossTasks(task, tasks);
      const heightPercentage = `${100 / (numberOfCrossTasks || 1)}%`;

      const timeLeftBefore = this.getTimeLeftBefore(task, tasks, index);
      const timeLeftBeforeMinutes = timeLeftBefore.asMinutes();
      if (timeLeftBeforeMinutes > 0) {
        const gridItemBefore = new GridTimelineItem({
          name: this.getDurationTimeString(timeLeftBefore),
          width: this.getDurationPercentage(timeLeftBeforeMinutes),
          height: null,
          type: GridTimelineItemType.timeGap,
          data: null
        });

        userGridItems.push(gridItemBefore);
      }

      const gridItemTask = new GridTimelineItem({
        name: task.name,
        width: this.getDurationPercentageBySartEnd(task.startsAt, task.endsAt),
        height: heightPercentage,
        type: GridTimelineItemType.task,
        data: task
      });

      userGridItems.push(gridItemTask);

      if (lastTask && task.name === lastTask.name) {
        const timeLeftAfter = this.getTimeLeftAfter(task);
        const timeLeftAfterMinutes = timeLeftAfter.asMinutes();
        if (timeLeftAfterMinutes > 0) {
          const gridItemBefore = new GridTimelineItem({
            name: this.getDurationTimeString(timeLeftAfter),
            width: this.getDurationPercentage(timeLeftAfterMinutes),
            height: null,
            type: GridTimelineItemType.timeGap,
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
    tasks: Task[],
    index: number
  ): moment.Duration {
    let timeLeftBefore = moment.duration(0);
    if (index > 0) {
      const previousTask = tasks[index - 1];
      if (!this.tasksCross(currentTask, previousTask)) {
        timeLeftBefore = moment.duration(
          currentTask.startsAt.diff(previousTask.endsAt)
        );
      }
    } else {
      const dayStartTime = moment('08:00', 'HH:mm');
      timeLeftBefore = moment.duration(currentTask.startsAt.diff(dayStartTime));
    }

    return timeLeftBefore;
  }

  private static getTimeLeftAfter(currentTask: Task): moment.Duration {
    let timeLeftAfter = moment.duration(0);
    const dayEndTime = moment('18:00', 'HH:mm');
    timeLeftAfter = moment.duration(dayEndTime.diff(currentTask.endsAt));

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

  private static getNumberOfCrossTasks(currentTask: Task, tasks: Task[], sum: number = 0) {
    for (const task of tasks) {
      const tasksToCheck = tasks.filter(t => t.name !== task.name);
      if (this.tasksCross(task, currentTask)) {
        sum = sum + 1;
      }
      this.getNumberOfCrossTasks(task, tasksToCheck, sum);
    }
    return sum;
  }

  private static tasksCross(task: Task, taskCheck: Task): boolean {
    return (
      (task.startsAt.isSameOrBefore(taskCheck.startsAt) &&
        task.endsAt.isSameOrAfter(taskCheck.endsAt)) ||
      task.startsAt.isBetween(taskCheck.startsAt, taskCheck.endsAt) ||
      task.endsAt.isBetween(taskCheck.startsAt, taskCheck.endsAt)
    );
  }

  private static getDurationTimeString(duration: moment.Duration): string {
    const hours = this.formatDurationInt(duration.hours());
    const minutes = this.formatDurationInt(duration.minutes());
    return `${hours}:${minutes}m`;
  }

  private static formatDurationInt(int: number): string {
    if (int < 10) {
      return `0${int}`;
    }
    return `${int}`;
  }
}
