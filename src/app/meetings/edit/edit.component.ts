import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { AppService } from './../../app.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router'
import { SocketService } from './../../socket.service'
import { Location } from '@angular/common'
import * as moment from 'moment'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [Location]
})
export class EditComponent implements OnInit {


  constructor(public router: Router,
    public toastr: ToastrService,
    public appService: AppService,
    public _route: ActivatedRoute,
    public socket: SocketService,
    public location: Location) { }

  public meetingId = this._route.snapshot.params.meetingId;
  public time: any;
  public place: any;
  public purpose: any;
  public adminName:any;
  public userId: any;
  public receiverId: any;
  public fullName: any;
  public email: any;
  public oldTime: any;
  public userName = Cookie.get('receiverName')

  ngOnInit() {
    this.appService.getSingleMeeting(this.meetingId).subscribe((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status == 200) {
        this.place = apiResponse.data[0].meetingVenue;
        this.purpose = apiResponse.data[0].meetingPurpose;
        this.time = apiResponse.data[0].meetingTime;
        this.adminName = apiResponse.data[0].adminName;
        this.oldTime = apiResponse.data[0].meetingTime;
        this.userId = apiResponse.data[0].userId;
        console.log(this.userId)
        this.oldTime = apiResponse.data[0].meetingTime;
      }
      else {
        this.toastr.warning("Some Error Occured");
      }
    })
    setTimeout(() =>
      this.getUser(this.userId), 1000);


  }
  public getUser = (userId) => {
    this.appService.getSingleUser(userId).subscribe((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status == 200) {
        this.receiverId = apiResponse.userId;
        this.fullName = apiResponse.data[0].firstName + ' ' + apiResponse.data[0].lastName;
        this.email = apiResponse.data[0].email;
      }
    })
    
  }

  public editMeetingFunction = () => {
    let currentMeeting = {
      meetingPurpose: this.purpose,
      meetingTime: moment(this.time).format('LLLL'),
      meetingPlace: this.place,
      meetingId: this.meetingId,
      adminName:Cookie.get('receiverName')
    }
    let data = {
      receiverId: this.userId,
      fullName: this.fullName,
      newMeetingTime: moment(this.time).format('LLLL'),
      adminName: Cookie.get('receiverName'),
      adminNo: Cookie.get('receiverNo'),
      email: this.email,
      oldMeetingTime: this.oldTime,
      msg: `Your Meeting that is on ${this.oldTime} changed to ${moment(this.time).format('LLLL')}`
    }
    this.appService.editMeeting(currentMeeting).subscribe((apiResponse) => {
      if (apiResponse.status == 200) {
        this.toastr.success("Meeting Edited successfully");
        this.socket.editMeetingAlert(data);
        setTimeout(() => {
          this.router.navigate([`/users/view/${this.userId}`],{queryParams:{name:data.fullName}})
        })
      }
      else if (apiResponse.status == 404) {
        this.router.navigate(['/error/notfound'])
      }
      else if (apiResponse.status == 400) {
        this.router.navigate(['/error/database'])
      }
      else {
        this.toastr.warning("Some Error Occured")
      }
    })


  }
  public goback = () => {
    this.router.navigate([`/meetings/view/${this.meetingId}`])
  }


}
