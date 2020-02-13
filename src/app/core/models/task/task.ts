export class Task {
  id: string;
  name: string;
  type: string;
  area: string;
  startsAt: string;
  endsAt: string;
  startedAt: string;
  endedAt: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
