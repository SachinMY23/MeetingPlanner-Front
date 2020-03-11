import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { DatabaseerrComponent } from './databaseerr/databaseerr.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NotfoundComponent, DatabaseerrComponent],
  imports: [
    CommonModule,
    CommonModule,
    ToastrModule,
    RouterModule.forChild([
      {path:'error/database',component:DatabaseerrComponent},
      {path:'error/notfound',component:NotfoundComponent},
    ])
  ]
  })

export class SharedModule { }
