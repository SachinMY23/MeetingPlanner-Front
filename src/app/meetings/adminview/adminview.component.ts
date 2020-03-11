import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppService} from './../../app.service'
import {Cookie} from 'ng2-cookies/ng2-cookies'
import {SocketService} from './../../socket.service'

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
  public userName:String=Cookie.get('receiverName');
  public allUsers=[];
  public userId:any;

  constructor(public router:Router,
    public toastr:ToastrService,
    public appService:AppService,
    public socket:SocketService,
    public _route:ActivatedRoute) { }
  
    ngOnInit() {
      this.userId=this._route.snapshot.params.userId;

      
    this.appService.getAllUsers().subscribe((apiResponse)=>{
      console.log(apiResponse);
      if(apiResponse.status===200){
           this.allUsers=apiResponse.data;
           
      }
      else if (apiResponse.status == 404) {
        this.router.navigate(['/error/notfound'])
      }
      else if (apiResponse.status == 400) {
        this.router.navigate(['/error/database'])
      }
      else{
        this.toastr.warning("Some Error Occured");
      }
    })

  }


  public goToEditProfile:any=()=>{
    this.router.navigate([`/edit/profile/${this.userId}`])
}

public goBack:any=()=>{
  
}

public logoutFunction: any = () => {

    this.appService.logout().subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        
        this.toastr.success("Logout Successfull...");
        this.socket.exitSocket();
        setTimeout(() => {
          this.router.navigate(['/login'])
        }
          , 2000);

      } else {
        this.toastr.error(`hi ${apiResponse.message}`);
      }
      (err) => {
        this.toastr.warning("some Error Occured while signin");
      }
    }
    )
  }

  


}
