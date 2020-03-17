
import { AdminviewComponent } from './adminview/adminview.component';
import { UserviewComponent } from './userview/userview.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { UserModule } from './../user/user.module'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MeetingviewComponent } from './meetingview/meetingview.component';
import { MeetingdayviewComponent } from './meetingdayview/meetingdayview.component';
import { SharedModule } from './../shared/shared.module'




@NgModule({
  declarations: [AdminviewComponent, UserviewComponent, CreateComponent, EditComponent, MeetingviewComponent, MeetingdayviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule,
    FlatpickrModule,
    RouterModule.forChild([
      { path: 'admin/view/:userId', component: AdminviewComponent },
      { path: 'users/view/:userId', component: UserviewComponent },
      { path: 'meetings/view/:meetingId', component: MeetingviewComponent },
      { path: 'meetings/create/:userId', component: CreateComponent },
      { path: 'meetings/edit/:meetingId', component: EditComponent }

    ]),
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })

  ]
})
export class MeetingsModule { }
