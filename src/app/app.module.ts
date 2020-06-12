import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { LoginModule } from './modules/login/login.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { HeaderComponent } from './components/header/header.component';
import { ContactsEditDialogComponent } from './components/contacts-edit-dialog/contacts-edit-dialog.component';
import { ContactPreviewComponent } from './pages/contact-preview/contact-preview.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    LoginModule,
    ContactsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
