export class User {
  username: string;
  password: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
