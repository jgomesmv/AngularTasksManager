import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'date-navigator',
  templateUrl: './date-navigator.component.html',
  styleUrls: ['./date-navigator.component.scss'],
  host: { class: 'c-dateNavigator' }
})
export class DateNavigatorComponent implements OnInit {
  currentDate: string;

  constructor() {}

  ngOnInit(): void {
    this.currentDate = moment(new Date()).format('dddd DD MMMM');
  }
}
