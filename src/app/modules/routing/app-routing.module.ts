import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from 'src/app/pages/contacts/contacts.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ContactPreviewComponent } from 'src/app/pages/contact-preview/contact-preview.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: ContactsComponent },
      { path: ':id', component: ContactPreviewComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
