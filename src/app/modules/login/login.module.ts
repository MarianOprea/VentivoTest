import { NgModule } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule { }
