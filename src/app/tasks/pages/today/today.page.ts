import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/core/models/user/user';
import { Task } from 'src/app/core/models/task/task';
import { ActivatedRoute } from '@angular/router';
import { GridItem } from '../../models/grid-item';
import { GridTimelineItem } from '../../models/grid-timeline-item';

@Component({
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss']
})
export class TodayPage implements OnInit {
  gridItems: GridItem[] = [];
  pendingTimelineItems: GridTimelineItem[] = [];
  groups: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(
      data => {
        // .filter(user => user.name === 'John 0.odev7ed0pse')
        this.gridItems = data.resolved.gridItems as GridItem[];
        this.pendingTimelineItems = data.resolved
          .pendingTimelineItems as GridTimelineItem[];
        this.groups = data.resolved.groups;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}
}
