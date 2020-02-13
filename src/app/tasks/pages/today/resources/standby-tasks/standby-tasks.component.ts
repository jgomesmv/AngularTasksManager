import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/core/models/task/task';

@Component({
  selector: 'standby-tasks',
  templateUrl: './standby-tasks.component.html',
  styleUrls: ['./standby-tasks.component.scss'],
  host: { class: 'c-standbyTasks' }
})
export class StandbyTasksComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {}
}
