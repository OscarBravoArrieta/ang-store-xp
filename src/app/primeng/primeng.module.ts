 import { NgModule } from '@angular/core'
 import { CommonModule } from '@angular/common'
 import { ButtonModule } from 'primeng/button'
 import { ImageModule } from 'primeng/image'
 import { InputTextModule } from 'primeng/inputtext'
 import { DynamicDialogModule } from 'primeng/dynamicdialog'
 import { CardModule } from 'primeng/card'
 import { MenuModule } from 'primeng/menu'
 import { DialogModule } from 'primeng/dialog'
 import { ToastModule } from 'primeng/toast'
 import { DropdownModule } from 'primeng/dropdown'
 import { PasswordModule } from 'primeng/password'
 import { DividerModule } from 'primeng/divider'
 import { ListboxModule } from 'primeng/listbox'
 import { SidebarModule } from 'primeng/sidebar'
 import { InputNumberModule } from 'primeng/inputnumber'
 import { ScrollPanelModule } from 'primeng/scrollpanel'
 import { BadgeModule } from 'primeng/badge'

 @NgModule({
     declarations: [],
     imports: [
         CommonModule,
         ButtonModule,
         ImageModule,
         InputTextModule,
         DynamicDialogModule,
         CardModule,
         MenuModule,
         DialogModule,
         ToastModule,
         DropdownModule,
         PasswordModule,
         DividerModule,
         ListboxModule,
         SidebarModule,
         InputNumberModule,
         ScrollPanelModule,
         BadgeModule

     ],
     exports: [
         ButtonModule,
         ImageModule,
         InputTextModule,
         DynamicDialogModule,
         CardModule,
         MenuModule,
         DialogModule,
         ToastModule,
         DropdownModule,
         PasswordModule,
         DividerModule,
         ListboxModule,
         SidebarModule,
         InputNumberModule,
         ScrollPanelModule,
         BadgeModule

     ]
 })
 export class PrimengModule { }
