import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridItem } from '../../models/grid-item';
import { GridTimelineItem } from '../../models/grid-timeline-item';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
  host: {class: 'p-today'}
})
export class TodayPage implements OnInit {
  gridItems: GridItem[] = [];
  pendingTimelineItems: GridTimelineItem[] = [];
  groups: string[] = [];

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {
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

  onLogoutClick(): void {
    this.authenticationService.logout();
  }
}
