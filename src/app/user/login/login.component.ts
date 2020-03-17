import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AppService } from './../../app.service'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from './../../socket.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public appService: AppService,
    public router: Router,
    public toastr: ToastrService,
    public socket: SocketService) { }

  public goToSignup: any = () => {
    this.router.navigate(['/signup']);
  }
  public goToRecoverPassword: any = () => {
    this.router.navigate(['/recover/password']);
  }
  public email: any;
  public password: any;


  ngOnInit() {
    console.log('login component started')
  }

  //sign in function start
  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warning("Enter Your Mail Id")
    }
    else if (!this.password) {
      this.toastr.warning("Enter Your Password");
    }
    else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.signinFunction(data).subscribe((apiResponse) => {
          Cookie.set('authtoken', apiResponse.data.authToken);
          Cookie.set('receiverId', apiResponse.data.userDetails.userId);
          Cookie.set('receiverName', apiResponse.data.userDetails.firstName + " " + apiResponse.data.userDetails.lastName);
          Cookie.set('receiverNo', apiResponse.data.userDetails.mobileNumber);
          Cookie.set('receiverEmail', apiResponse.data.userDetails.email);
          Cookie.set('receiverIsAdmin', apiResponse.data.userDetails.isAdmin);
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
          this.toastr.success("Login Successfull...");
          let userId = apiResponse.data.userDetails.userId;
          this.socket.verifyUser();

          this.socket.registerUser(userId);

          if (apiResponse.data.userDetails.isAdmin == true) {
            setTimeout(() => {
              this.router.navigate([`/admin/view/${userId}`])
            }, 2000);
          }
          else {
            setTimeout(() => {
              this.router.navigate([`/users/view/${userId}`])
            }, 2000);
          }

        },

       
        (err) => {
          this.toastr.warning("You Entered Wrong Password");
          console.log(err);
          console.log(err.status);
        }
      )
      }
  }
  //sign in function end
  ngOnDestroy() {
    console.log("Login component destroyed");
  }
}
