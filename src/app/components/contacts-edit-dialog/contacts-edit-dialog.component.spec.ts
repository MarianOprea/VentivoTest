import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsEditDialogComponent } from './contacts-edit-dialog.component';

describe('ContactsEditDialogComponent', () => {
  let component: ContactsEditDialogComponent;
  let fixture: ComponentFixture<ContactsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
