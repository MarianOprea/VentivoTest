import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  contactId: number;
  contact: IUser;
  constructor(
    private route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly auth: AuthService,
    private readonly location: Location
  ) {}

  get checkIfLoggedIn(): boolean {
    return this.contact && this.auth.userInfo.email === this.contact.email;
  }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact() {
    this.contactId =
      this.contactId || Number(this.route.snapshot.paramMap.get('id'));
    this.api.getContactById(this.contactId).then((contact) => {
      this.editForm.setValue(contact);
      this.contact = contact;
    });
  }

  goBack() {
    this.location.back();
  }

  saveContact() {
    this.api
      .editContact(this.editForm.value)
      .then((response) => this.loadContact());
  }
}
