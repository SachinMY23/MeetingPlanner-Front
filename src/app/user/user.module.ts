import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecPasswordComponent } from './rec-password/rec-password.component';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ToastrService, ToastrModule} from 'ngx-toastr';
import {MeetingsModule} from './../meetings/meetings.module'
import { EditprofileComponent } from './editprofile/editprofile.component';





@NgModule({
  declarations: [LoginComponent, SignupComponent, RecPasswordComponent,EditprofileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    MeetingsModule,
    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
      {path:'recover/password',component:RecPasswordComponent},
      {path:'edit/profile/:userId',component:EditprofileComponent}
    ])
  ]
})
export class UserModule { }
