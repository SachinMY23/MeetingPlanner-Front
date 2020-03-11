import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-databaseerr',
  templateUrl: './databaseerr.component.html',
  styleUrls: ['./databaseerr.component.css']
})
export class DatabaseerrComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  public goToLogin=()=>{
    this.router.navigate(['/login']);
  }
}
