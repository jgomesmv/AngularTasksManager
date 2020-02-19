import { GridItemType } from '../enums/grid-item-type.enum';
import { Task } from 'src/app/core/models/task/task';

export class GridItem {
  text: string;
  width: string;
  height: string;
  type: GridItemType;
  data: Task;

  constructor(data) {
    Object.assign(this, data);
  }
}
