import { GridTimelineItem } from './grid-timeline-item';

export class GridItem {
  id: string;
  name: string;
  email: string;
  areas: string[];
  groups: string[];
  gridTimelineItems: GridTimelineItem[];

  constructor(data) {
    Object.assign(this, data);
  }
}
