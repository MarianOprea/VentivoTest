import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Actions } from 'src/app/utils/actions-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent implements OnInit {
  @Input() contactsData: IUser[];
  @Output() action: EventEmitter<{action: Actions, contact?: IUser}> = new EventEmitter();

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'actions',
  ];

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit(): void {}

  checkIfLoggedIn(email): boolean {
    return this.auth.userInfo.email === email;
  }

  editContact(contact: IUser){
    this.action.next({action: Actions.edit, contact});
  }

  addContact(){
    this.action.next({action: Actions.add});
  }

  deleteContact(contact: IUser){
    this.action.next({action: Actions.delete, contact});
  }

  previewContact(contact: IUser){
    this.router.navigate(['contacts', contact.id]);
  }
}
