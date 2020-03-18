import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { AppService } from './../../app.service'
import { SocketService } from './../../socket.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router'
import * as moment from 'moment'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public time: any;
  public place: any;
  public purpose: any;
  public adminName: any;
  public userId = this._route.snapshot.params.userId;
  public receiverId: any;
  public fullName: any;
  public email: any;
  public oldTime: any;
  public userName = Cookie.get('fullName')


  constructor(public router: Router,
    public toastr: ToastrService,
    public appService: AppService,
    public socket: SocketService,
    public _route: ActivatedRoute) { }



  ngOnInit() {
    this.appService.getSingleUser(this.userId).subscribe((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status == 200) {
        this.fullName = apiResponse.data[0].firstName + ' ' + apiResponse.data[0].lastName;
        this.email = apiResponse.data[0].email;
      }
    })

  }

  public goToUsersview: any = () => {
    this.router.navigate([`users/view/${this.userId}`], { queryParams: { name: this.fullName } });
  }
  public createMeetingFunction: any = () => {
    let meeting = {
      place: this.place,
      time: moment(this.time).format('LLLL'),
      purpose: this.purpose,
      userId: this.userId
    }
    let data = {
      receiverId: this.userId,
      fullName: this.fullName,
      meetingTime: moment(this.time).format('LLLL'),
      adminName: this.adminName,
      adminNo: Cookie.get('receiverNo'),
      email: this.email,
      msg: `Your Meeting is scheduled on ${moment(this.time).format('LLLL')}`
    }

    this.appService.createMeeting(meeting).subscribe((apiResponse) => {
      if (apiResponse.status == 200) {
        this.toastr.success("Meeting Created Successfully")
        this.socket.createMeetingAlert(data);
        setTimeout(() => {
          this.router.navigate([`/users/view/${this.userId}`], { queryParams: { name: this.fullName } });

        }, 2000)
      }
      else if (apiResponse.status == 404) {
        this.router.navigate(['/error/notfound'])
      }
      else if (apiResponse.status == 400) {
        this.router.navigate(['/error/database'])
      }

      else {
        this.toastr.warning("Some Error Occured");
      }
    })
  }


}
