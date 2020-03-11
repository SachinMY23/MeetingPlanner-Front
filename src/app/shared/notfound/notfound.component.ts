import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {


  constructor(public router:Router) { }

  ngOnInit() {
  }
  
  public goToLogin=()=>{
    this.router.navigate(['/login']);
  }
}
