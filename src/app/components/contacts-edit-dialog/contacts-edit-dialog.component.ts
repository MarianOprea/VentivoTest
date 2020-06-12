import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditContactDialogData } from 'src/app/models/EditContactDialogData';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/User';

@Component({
  selector: 'app-contacts-edit-dialog',
  templateUrl: './contacts-edit-dialog.component.html',
  styleUrls: ['./contacts-edit-dialog.component.scss'],
})
export class ContactsEditDialogComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public dialogRef: MatDialogRef<ContactsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditContactDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.editForm.setValue(this.data.contact);
    }
  }

  submit() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}
