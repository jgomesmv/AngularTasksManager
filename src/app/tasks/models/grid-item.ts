import { GridTimelineItem } from './grid-timeline-item';

export class GridItem {
  id: string;
  name: string;
  areas: string[];
  gridTimelineItems: GridTimelineItem[];

  constructor(data) {
    Object.assign(this, data);
  }
}
