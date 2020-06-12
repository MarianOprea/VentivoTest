import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models/User';
import { Actions } from 'src/app/utils/actions-enum';
import { MatDialog } from '@angular/material/dialog';
import { ContactsEditDialogComponent } from 'src/app/components/contacts-edit-dialog/contacts-edit-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialog: TemplateRef<MatDialog>;

  contactsData: IUser[];

  constructor(
    private readonly api: ApiService,
    private readonly dialog: MatDialog
  ) {}

  get userData(): IUser[] {
    return this.contactsData || [];
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  private loadContacts() {
    this.api.getContacts().then((data) => (this.contactsData = data));
  }

  applyAction(ev: { action: Actions; contact: IUser }) {
    switch (ev.action) {
      case Actions.add:
        this.addContact(ev.contact);
        break;
      case Actions.edit:
        this.editContact(ev.contact);
        break;
      case Actions.delete:
        this.deleteContact(ev.contact);
        break;
    }
  }

  addContact(contact: IUser) {
    const addDialogRef = this.dialog.open(ContactsEditDialogComponent, {
      data: { isEdit: false },
    });
    addDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.api.addContact(res).then((response) => this.loadContacts());
      }
    });
  }

  editContact(contact: IUser) {
    const editDialogRef = this.dialog.open(ContactsEditDialogComponent, {
      data: { isEdit: true, contact },
    });

    editDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.api.editContact(res).then((response) => this.loadContacts());
      }
    });
  }

  deleteContact(contact: IUser) {
    const confirmationDialogRef = this.dialog.open(this.confirmationDialog, {
      data: contact,
    });

    confirmationDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.api
          .deleteContact(contact.id)
          .then((response) => this.loadContacts());
      }
    });
  }
}
