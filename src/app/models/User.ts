export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;

  static fromJson(data: IUser) {
    return new User({
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    });
  }

  constructor(data: IUser) {
    Object.assign(this, data);
  }
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface IUserEntity {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
