 import { NgModule } from '@angular/core'
 import { CommonModule } from '@angular/common'


 import { SharedRoutingModule } from './shared-routing.module'

 import { HeaderComponent } from './components/header/header.component'
 import { FooterComponent } from './components/footer/footer.component'
 import { PrimengModule } from '../primeng/primeng.module'

 @NgModule({
     declarations: [],
     imports: [
         CommonModule,
         SharedRoutingModule,
         HeaderComponent,
         FooterComponent,
         PrimengModule
     ],

     exports: [
         HeaderComponent,
         FooterComponent,
         PrimengModule


     ]
 })
 export class SharedModule { }
