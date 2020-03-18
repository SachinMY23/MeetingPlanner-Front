import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cookie} from  'ng2-cookies/ng2-cookies';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url =  'http://api.techway.xyz';
 //private url = 'http://localhost:3000';



  constructor(public http:HttpClient) { }

  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

  public deleteUserInfoInLocalStorage=()=>{
    localStorage.removeItem('userInfo')

  }

  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('adminKey', data.adminKey)
      .set('countryCode',data.countryCode);

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  } // end of signupFunction function.

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(this.url+'/api/v1/users/login',params);
  } // end of signinFunction function.

  
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'));
      console.log(Cookie.get('authtoken'))


    return this.http.post(`${this.url}/api/v1/users/logout`, params);
    
  } // end logout fun

  public recoverPass(data):Observable<any>{
      const params=new HttpParams()
      .set('email',data.email);

      return this.http.post(this.url+'/api/v1/users/recover/password',params);
  }

  public changePass(data):Observable<any>{
    let authtok=Cookie.get('authtoken');

    const params=new HttpParams()
    .set('currPassword',data.oldPass)
    .set('newPassword',data.newPass);

    return this.http.post(this.url+`/api/v1/users/change/password/${data.userId}?authToken=${authtok}`,params);
}

  public getSingleUser(userId):Observable<any>{
      let authtok=Cookie.get('authtoken');
    return this.http.get(`${this.url}/api/v1/users/single/user/${userId}?authToken=${authtok}`);
 
  }

  public getAllUsers(skip:Number):Observable<any>{
    
    let authtok=Cookie.get('authtoken');
    return this.http.get(`${this.url}/api/v1/users/all/users?authToken=${authtok}&skip=${skip}`);
 
  }
  public getCountryCode=()=>{
    return this.http.get(`http://country.io/phone.json`);

  }

  public editProfile(data):Observable<any>{
    let authtok=Cookie.get('authtoken');

    const params=new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('countryCode',data.countryCode)
    .set('mobileNumber',data.mobileNumber);
    return this.http.post(`${this.url}/api/v1/users/edit/profile/${Cookie.get('receiverId')}?authToken=${authtok}`,params);

  }

  public deleteSingleUser(userId):Observable<any>{
    const params=new HttpParams()
    .set('authToken',Cookie.get('authtoken'))
  return this.http.post(`${this.url}/api/v1/users/delete/single/${userId}`,params);

}
public deleteAllUsers(data):Observable<any>{
  const params=new HttpParams()
  .set('authToken',Cookie.get('authtoken'))
return this.http.post(`${this.url}/api/v1/users/delete/all`,params);

}

public getSingleMeeting(meetingId):Observable<any>{
  let authtok=Cookie.get('authtoken');
  return this.http.get(`${this.url}/api/v1/meetings/single/${meetingId}?authToken=${authtok}`);
}

public getAllMeetings(userId,skip):Observable<any>{
  let authtok=Cookie.get('authtoken');
  return this.http.get(`${this.url}/api/v1/meetings/all/${userId}?authToken=${authtok}&skip=${skip}`);
}

public createMeeting(data):Observable<any>{
  let authtok=Cookie.get('authtoken');
  const params=new HttpParams()
  .set('authToken',authtok)
  .set('meetingVenue',data.place)
  .set('meetingTime',data.time)
  .set('meetingPurpose',data.purpose)
  return this.http.post(`${this.url}/api/v1/meetings/create/${data.userId}`,params);

}

public editMeeting(data):Observable<any>{
  let authtok=Cookie.get('authtoken');

  const params=new HttpParams()
  .set('meetingVenue',data.meetingPlace)
  .set('meetingTime',data.meetingTime)
  .set('meetingPurpose',data.meetingPurpose)
  return this.http.post(`${this.url}/api/v1/meetings/edit/${data.meetingId}?authToken=${authtok}`,params);

}

public deleteSingleMeeting(meetingId):Observable<any>{
  const params=new HttpParams()
  .set('authToken',Cookie.get('authtoken'))
return this.http.post(`${this.url}/api/v1/meetings/delete/${meetingId}`,params);

}
public deleteAllMeetings(data):Observable<any>{
const params=new HttpParams()
.set('authToken',Cookie.get('authtoken'))
return this.http.post(`${this.url}/api/v1/meetings/delete/all`,params);

}

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError
}
