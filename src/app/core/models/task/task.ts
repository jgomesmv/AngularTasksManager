import moment from 'moment';

export class Task {
  id: string;
  name: string;
  type: string;
  area: string;
  startsAt: moment.Moment;
  endsAt: moment.Moment;
  startedAt: moment.Moment;
  endedAt: moment.Moment;

  constructor(data) {
    data.startsAt = moment(data.startsAt, 'HH:mm');
    data.endsAt = moment(data.endsAt, 'HH:mm');
    data.startedAt = moment(data.startedAt, 'HH:mm');
    data.endedAt = moment(data.endedAt, 'HH:mm');

    Object.assign(this, data);
  }
}
