import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'date-navigator',
  templateUrl: './date-navigator.component.html',
  styleUrls: ['./date-navigator.component.scss'],
  host: { class: 'c-dateNavigator' }
})
export class DateNavigatorComponent implements OnInit {
  @Output() currentDateChanged = new EventEmitter<Date>();

  currentDate: string;

  constructor() {}

  ngOnInit(): void {
    this.currentDate = moment(new Date()).format('dddd DD MMMM');
  }

  onBackClick(): void {
    this.currentDate = moment(this.currentDate)
      .subtract(1, 'day')
      .format('dddd DD MMMM');
    this.currentDateChanged.emit(moment(this.currentDate).toDate());
  }

  onForwardClick(): void {
    this.currentDate = moment(this.currentDate)
      .add(1, 'day')
      .format('dddd DD MMMM');
    this.currentDateChanged.emit(moment(this.currentDate).toDate());
  }
}
