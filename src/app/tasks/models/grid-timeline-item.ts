import { GridTimelineItemType } from '../enums/grid-item-type.enum';
import { Task } from 'src/app/core/models/task/task';

export class GridTimelineItem {
  userId: string;
  name: string;
  width: string;
  height: string;
  type: GridTimelineItemType;
  data: Task;

  constructor(data) {
    Object.assign(this, data);
  }
}
