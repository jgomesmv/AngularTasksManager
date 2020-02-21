import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDataSource } from 'src/app/core/data-sources/user-data-source/user.data-source';
import { User } from 'src/app/core/models/user/user';
import { PendingTaskDataSource } from 'src/app/core/data-sources/pending-task-data-source/pending-task-data-source.service';
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

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(
      data => {
        // .filter(user => user.name === 'John 0.odev7ed0pse')
        this.gridItems = data.resolved.gridItems as GridItem[];
        this.pendingTimelineItems = data.resolved.pendingTimelineItems as GridTimelineItem[];
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }
}
