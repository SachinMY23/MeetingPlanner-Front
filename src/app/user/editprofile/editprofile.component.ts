import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AppService } from './../../app.service';
import { ActivatedRoute } from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {


  public firstName: any;
  public lastName: any;
  public mobile: Number;
  public email: any;
  public password: any;
  public countryCode: Number;
  public userName = Cookie.get('fullName')


  constructor(public router: Router,
    public appService: AppService,
    public toastr: ToastrService,
    public _route: ActivatedRoute) { }


  public userId = this._route.snapshot.params.userId;


  ngOnInit() {
    this.getProfileFunction();
  }
  public goToLogin: any = () => {
    this.router.navigate(['/login'])
  }

  public goToUserview: any = () => {
    this.router.navigate([`/users/view/${Cookie.get('receiverId')}`])
  }
  public goToAdminview: any = () => {
    this.router.navigate([`/admin/view/${Cookie.get('receiverId')}`])
  }

  public getProfileFunction: any = () => {
    this.appService.getSingleUser(this.userId).subscribe((apiResponse) => {
      console.log(apiResponse)
      if (apiResponse.status === 200) {
        for (let i = 0; i < (apiResponse.data).length; i++) {
          this.firstName = apiResponse.data[i].firstName;
          this.lastName = apiResponse.data[i].lastName;
          this.mobile = apiResponse.data[i].mobileNumber;
          this.countryCode = apiResponse.data[i].countryCode;
          this.email = apiResponse.data[i].email;
        }
      }
      else {
        this.toastr.warning("Database Error");
      }
    })
  }

  public editProfileFunction: any = () => {

    {
      if (!this.firstName) {
        this.toastr.warning('Enter Your First Name')
      }
      else if (!this.lastName) {
        this.toastr.warning('Enter Your Last Name')
      } else if (!this.mobile) {
        this.toastr.warning('Enter Your Mobile No. ')
      } else if (!this.email) {
        this.toastr.warning('Enter Your Mail id ')
      } else if (!this.countryCode) {
        this.toastr.warning('Enter Your Country Code ')
      }
      else {
        console.log("Error")
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          mobileNumber: this.mobile,
          email: this.email,
          countryCode: this.countryCode
        }

        this.appService.editProfile(data).subscribe((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.toastr.success("Profile Edited Successfully");
            Cookie.set('receiverName', this.firstName + ' ' + this.lastName);
             if((Cookie.get('receiverIsAdmin'))=='true'){
            setTimeout(() => {
              this.goToAdminview();
            }, 2000);
          }else{
            this.goToUserview();
          }
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
          (err) => {
            this.toastr.warning("Some Error Occured");
          }
        );
      }
    }
  }
}
