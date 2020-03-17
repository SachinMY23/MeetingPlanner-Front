import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { AppService } from './../../app.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router'
import { SocketService } from './../../socket.service'
import * as moment from 'moment'

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],

})

export class UserviewComponent implements OnInit {

  public userName: String = Cookie.get('receiverName');
  public userIsAdmin: any;


  constructor(public router: Router,
    public toastr: ToastrService,
    public appService: AppService,
    private modal: NgbModal,
    public _route: ActivatedRoute,
    public socket: SocketService) { }
  public alert: boolean;
  public count = 0;



  public userId = this._route.snapshot.params.userId;
  public name = this._route.snapshot.queryParams.name;
  public allMeetings: any;
  public notLoaded: boolean = true;

  public inf = {
    userId: this.userId
  }
  public skipInit = 0;


  ngOnInit() {

    this.userName= Cookie.get('receiverName');

    this.getMeetings(this.userId, this.skipInit);

    if (Cookie.get('receiverIsAdmin') === 'true') {
      this.userIsAdmin = true;
    }
    this.socket.directAlert().subscribe((message) => {
      setTimeout(() => { this.toastr.show(message.msg) }, 2000)
    }
    )
    if(Cookie.get('receiverIsAdmin')!=="true"){
    this.socket.meetingAlert().subscribe((message) => {
      if (message.userId == this.userId) {
        this.alert = true;
      }
    }
    )
    this.socket.meetingAlertSnooze().subscribe((message) => {
      if (message.userId == this.userId) {
        this.alert = true;
      }
    })
  }

  }
  public alertClientAgain = () => {
    this.alert = false;
    this.socket.snoozeMeetingAlert(this.inf);
    console.log("Dismissed");
  }
  public goToEditProfile: any = () => {
    this.router.navigate([`/edit/profile/${Cookie.get('receiverId')}`])
  }
  public goToChangePassword:any=()=>{
    this.router.navigate([`/change/password/${Cookie.get('receiverId')}`])

  }
  public getMeetings = (userId, skip) => {
    this.appService.getAllMeetings(userId, skip).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        this.notLoaded = false;
        this.allMeetings = apiResponse.data;

      }
      else if (apiResponse.status == 404) {
        this.toastr.show("No Meetings Found");
      }
      else if (apiResponse.status == 400) {
        this.router.navigate(['/error/database'])
      }
      else {
        this.toastr.warning("Some Error Occured")
      }
    })
  }

  public loadMoreMeetings = () => {
    this.count += 1;
    let skip = 3 * this.count;
    this.appService.getAllMeetings(this.userId, skip).subscribe((apiResponse) => {
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        this.notLoaded = false;
        this.allMeetings = [...this.allMeetings, ...apiResponse.data];

      }
      else {
        this.toastr.show("No Meetings Found");
      }
    })
  }
  public goBack: any = () => {
    this.router.navigate([`/admin/view/${Cookie.get('receiverId')}`])

  }
  public createMeetingFunction = () => {


    this.router.navigate([`/meetings/create/${this.userId}`])

  }
  public logoutFunction: any = () => {

    this.appService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {

        this.toastr.success("Logout Successfull...");
        Cookie.deleteAll();
        this.socket.exitSocket();
        setTimeout(() => {
          this.router.navigate(['/login'])
        }
          , 2000);

      } else {
        this.toastr.error(`hi ${apiResponse.message}`);
      }
      (err) => {
        this.toastr.warning("some Error Occured while signout");
      }
    }
    )
  }






}






