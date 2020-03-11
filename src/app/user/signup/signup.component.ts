import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr'
import {AppService} from './../../app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:any;
  public lastName:any;
  public mobile:any;
  public email:any;
  public password:any;
  public adminKey:any;
  public countryCode:any;
  constructor(public router:Router,
    public appService:AppService,
    public toastr:ToastrService) { }

    public codeList=[1,2,3]

  ngOnInit() {
  }
  public goToLogin:any=()=>{
    this.router.navigate(['/login'])
   }

   //sign up function start
   public signupFunction:any=()=>
  {
    if(!this.firstName)
    {
      this.toastr.warning('Enter Your First Name')
    }
    else if(!this.lastName)
    {
      this.toastr.warning('Enter Your Last Name')
    }else if(!this.mobile)
    {
      this.toastr.warning('Enter Your Mobile No. ')
    }else if(!this.email)
    {
      this.toastr.warning('Enter Your Mail id ')
    }else if(!this.password)
    {
      this.toastr.warning('Enter Your Password')
    }
    else{
      let data={
        firstName:this.firstName,
        lastName:this.lastName,
        mobileNumber:this.mobile,
        email:this.email,
        password:this.password,
        adminKey:this.adminKey,
        countryCode:this.countryCode
      }
      console.log(data);

      this.appService.signupFunction(data).subscribe((apiResponse)=>
      {
        console.log(apiResponse);
        if(apiResponse.status===200)
        {
          this.toastr.success("Signup Successfull...");
        
        setTimeout(()=>
        {
          this.goToLogin();
        },2000);
        }else{
           this.toastr.error(apiResponse.message);
        }
      },
      (err)=>
      {
        this.toastr.warning("Some Error Occured while signup");
      }
    );
    }
    }//end of sign up function
    public getList=()=>{
      this.appService.getCountryCode().subscribe((apiResponse)=>{
        console.log(apiResponse);
      })
    }
    }

