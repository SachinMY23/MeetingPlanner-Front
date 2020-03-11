import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies'
import {AppService} from './../../app.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router'
import {SocketService} from './../../socket.service'
import * as moment from 'moment'

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
  
})

export class UserviewComponent implements OnInit {
  
  public userName:String=Cookie.get('receiverName');
  public userIsAdmin:any;


  constructor(public router:Router,
    public toastr:ToastrService,
    public appService:AppService,
    private modal: NgbModal,
    public _route:ActivatedRoute,
    public socket:SocketService) {}
    public alert:boolean;

    

    public userId=this._route.snapshot.params.userId;
    public name=this._route.snapshot.queryParams.name;
    public allMeetings=[];
    public notLoaded:boolean=true;
   
    public inf={
       userId:this.userId
    }
   
   
  ngOnInit() {
    setTimeout(()=>{
    this.getMeetings(this.userId)},2000);

    if(Cookie.get('receiverIsAdmin')==='true'){
         this.userIsAdmin=true;
        }
        
      this.socket.directAlert().subscribe((message)=>{
        console.log('direct alert')
      setTimeout(()=>{this.toastr.success(message.msg)},2000)
      }
       )
       this.socket.meetingAlert().subscribe((message)=>{
        if(message.userId==this.userId){
          console.log("message "+message)
        console.log('meeting alert')
        this.alert=true;
        }
       }
        )
        this.socket.meetingAlertSnooze().subscribe((message)=>{
          if(message.userId==this.userId){
            console.log('meeting alert')
            this.alert=true;
            }
        })

    }
  public alertClientAgain=()=>{
    this.alert=false;
    this.socket.snoozeMeetingAlert(this.inf);
    console.log("Dismissed");
  }
  public goToEditProfile:any=()=>{
      this.router.navigate([`/edit/profile/${Cookie.get('receiverId')}`])
  }
  public getMeetings=(userId)=>{
    this.appService.getAllMeetings(userId).subscribe((apiResponse)=>{
      console.log(apiResponse);
      if(apiResponse.status==200){
        this.notLoaded=false;
        this.allMeetings=apiResponse.data;
        
      }
      else if (apiResponse.status == 404) {
        this.router.navigate(['/error/notfound'])
      }
      else if (apiResponse.status == 400) {
        this.router.navigate(['/error/database'])
      }
      else{
        this.toastr.warning("Some Error Occured")
      }
    })
  }
  public goBack:any=()=>{
    this.router.navigate([`/admin/view/${Cookie.get('receiverId')}`])

  }
  public createMeetingFunction=()=>{
   

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
          this.toastr.error(`hi ${ apiResponse.message}`);
        }
        (err) => {
          this.toastr.warning("some Error Occured while signout");
        }
      }
      )
    }


  
    
  
 
}


  

  

