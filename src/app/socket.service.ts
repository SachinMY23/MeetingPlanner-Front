import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators'
import {tap,map} from 'rxjs/operators'
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';


  private socket;


  constructor(public http: HttpClient) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);

  }

  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('register-users',()=> {

        observer.next();

      }); // end Socket

    }); // end Observable

  }

  public registerUser=(data)=>{
    this.socket.on('register',data);
  }

  public meetingAlert= () => {

    return Observable.create((observer) => {

      this.socket.on('client-alert', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  }
  public meetingAlertSnooze= () => {

    return Observable.create((observer) => {

      this.socket.on('client-alert-snooze', (data) => {

        observer.next(data);

      }); // end Socket

    }); // 
  }
  public editMeetingAlert = (data) => {

    this.socket.emit("meeting-edit-notification", data);

  }

  public createMeetingAlert = (data) => {

    this.socket.emit("meeting-create-notification", data);

  }

  public deleteMeetingAlert = (data) => {

    this.socket.emit("meeting-delete-notification", data);

  }

  public snoozeMeetingAlert = (data) => {

    this.socket.emit("snooze", data);

  }

  // events to be listened 
  public exitSocket = () =>{


    this.socket.disconnect();


  }// end exit socket

  public directAlert=()=>{
    return Observable.create((observer) => {

      this.socket.on(Cookie.get('receiverId'),(data)=>{

        observer.next(data);

      }); 
          
    });
  }

  public alert=(data)=>{

      this.socket.emit(data.receiverId,data);
  }



//error handler
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
