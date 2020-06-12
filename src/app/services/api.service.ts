import { Injectable } from '@angular/core';
import { users } from '../mockData/users.json';
import { IUserEntity, IUser, User } from '../models/User';

const userData = users as IUserEntity[];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  cache = new Map<number, User>();

  constructor() {}

  loadCache() {
    if (this.cache.size === 0) {
      userData.map((x) => this.cache.set(x.id, User.fromJson(x)));
    }
  }

  getContacts(): Promise<IUser[]> {
    this.loadCache();
    return Promise.resolve([...this.cache.values()]);
  }

  getContactById(id: number): Promise<IUser> {
    this.loadCache();
    const contact = this.cache.get(id);
    if (!contact) {
      return Promise.reject('Not Found');
    }
    return Promise.resolve(contact);
  }

  addContact(contact: IUser) {
    const id = this.cache.size + 2;
    this.cache.set(id, { ...contact, id });
    return Promise.resolve();
  }

  editContact(contact: IUser) {
    if (this.cache.has(contact.id)) {
      this.cache.set(contact.id, contact);
      return Promise.resolve();
    }

    return Promise.reject('No Contact found.');
  }

  deleteContact(contactId: number) {
    this.cache.delete(contactId);
    return Promise.resolve();
  }
}
