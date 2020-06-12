import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from 'src/app/pages/contacts/contacts.component';
import { MaterialModule } from '../material/material.module';
import { ContactsTableComponent } from 'src/app/components/contacts-table/contacts-table.component';
import { ContactsEditDialogComponent } from 'src/app/components/contacts-edit-dialog/contacts-edit-dialog.component';
import { ContactPreviewComponent } from 'src/app/pages/contact-preview/contact-preview.component';

@NgModule({
  imports: [MaterialModule],
  declarations: [
    ContactsComponent,
    ContactsTableComponent,
    ContactsEditDialogComponent,
    ContactPreviewComponent,
  ],
  entryComponents: [ContactsEditDialogComponent],
})
export class ContactsModule {}
