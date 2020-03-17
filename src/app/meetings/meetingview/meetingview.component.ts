import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from './../../socket.service'
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { ActivatedRoute } from '@angular/router'
import { AppService } from './../../app.service'
import { Location } from '@angular/common';


@Component({
  selector: 'app-meetingview',
  templateUrl: './meetingview.component.html',
  styleUrls: ['./meetingview.component.css'],
  providers: [Location]
})
export class MeetingviewComponent implements OnInit {

  public meetingId = this._route.snapshot.params.meetingId;
  public time: any;
  public place: any;
  public purpose: any;
  public adminName: any;
  public userId: any;
  public receiverId: any;
  public fullName: any;
  public email: any;
  public oldTime: any;
  public alert: boolean;
  public isAdmin: boolean;


  constructor(public router: Router,
    public toastr: ToastrService,
    public appService: AppService,
    public _route: ActivatedRoute,
    public socket: SocketService,
    public location: Location) { }

  ngOnInit() {
    if (Cookie.get('receiverIsAdmin') == 'true') {
      this.isAdmin = true;
    }
    this.getMeeting(this.meetingId)
    setTimeout(() => {
      this.getSingleUser(this.userId)
    }, 1000)
    if(Cookie.get('receiverIsAdmin')!=='true'){
    this.socket.meetingAlert().subscribe((message) => {
      if (message.userId == this.userId) {
        console.log('meeting alert')
        this.alert = true;
      }
    }
    )
    this.socket.meetingAlertSnooze().subscribe((message) => {
      if (message.userId == this.userId) {
        console.log('meeting alert')
        this.alert = true;
      }
    })
  }

  }
  public alertClientAgain = () => {
    this.alert = false;
    let inf = {
      userId: this.userId
    }
    this.socket.snoozeMeetingAlert(inf);
    console.log("Dismissed");
  }
  public getMeeting = (meetingId) => {
    this.appService.getSingleMeeting(meetingId).subscribe((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status == 200) {
        this.place = apiResponse.data[0].meetingVenue;
        this.purpose = apiResponse.data[0].meetingPurpose;
        this.time = apiResponse.data[0].meetingTime;
        this.adminName = apiResponse.data[0].adminName;
        this.userId = apiResponse.data[0].userId;
        console.log(this.userId);
        this.oldTime = apiResponse.data[0].meetingTime;
      }
      else {
        this.toastr.warning("Some Error Occured");
      }
    })
  }
  public getSingleUser: any = (userId) => {
    this.appService.getSingleUser(userId).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        this.fullName = apiResponse.data[0].firstName + ' ' + apiResponse.data[0].lastName;

        this.email = apiResponse.data[0].email;
      }
    })
  }

  public editMeetingFunction = () => {
    this.router.navigate([`/meetings/edit/${this.meetingId}`])
  }
  public deleteMeetingFunction = () => {

    let data = {
      receiverId: this.userId,
      fullName: this.fullName,
      meetingTime: this.oldTime,
      adminName: this.adminName,
      adminNo: Cookie.get('receiverNo'),
      email: this.email,
      msg: `Your Meeting that was on ${this.oldTime} is cancelled`
    }
    this.appService.deleteSingleMeeting(this.meetingId).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        this.toastr.success("Meeting Deleted successfully");
        this.socket.deleteMeetingAlert(data);
        this.socket.alert(data)
        setTimeout(() => { this.router.navigate([`users/view/${this.userId}`],{queryParams:{name:data.fullName}}) }, 2000)
      }
      else {
        this.toastr.warning("Some Error Occured")
      }
    })
  }
  public goBack = () => {
    this.router.navigate([`/users/view/${this.userId}`], { queryParams: { name: this.fullName } });
  }

}
