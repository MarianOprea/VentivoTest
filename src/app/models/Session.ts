import { IUser } from './User';

export class Session implements ISession {
  firstName: string;
  lastName: string;
  email: string;

  static fromJson(data: IUser) {
    return new Session({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  constructor(data: ISession) {
    Object.assign(this, data);
  }
}

export interface ISession {
  firstName: string;
  lastName: string;
  email: string;
}
