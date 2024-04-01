 import { Component, inject, signal } from '@angular/core'
 import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { MessageService } from 'primeng/api'
 import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
 import { UsersService } from '../../../services/users.service'
 import { UserToLog } from '../../../../models/user.model'
 import { LocalStorageService } from '../../../services/local-storage.service'
 import { RouterLinkWithHref } from '@angular/router'
 import { Router } from '@angular/router'
 import { RegisterComponent } from '../register/register.component'

 import { AuthStore } from '../../auth.store'
 import * as authActions  from '../../auth.actions'
 import { Subscription } from 'rxjs'


 @Component({
     selector: 'app-login',
     standalone: true,
     imports: [FormsModule, ReactiveFormsModule, PrimengModule, RouterLinkWithHref ],
     templateUrl: './login.component.html',
     styleUrl: './login.component.scss',
     providers: [MessageService, DialogService, AuthStore  ]
 })


 export class LoginComponent {

     private dialogService = inject(DialogService)
     private formBuilder = inject (FormBuilder)
     private userService = inject(UsersService)
     private localStorageService = inject(LocalStorageService)
     private store = inject(AuthStore);
     private router = inject(Router)
     private messageService = inject (MessageService)
     private ref = inject (DynamicDialogRef)

     form!: FormGroup
     statusForm = signal(false)
     token = signal('')

     refRegister: DynamicDialogRef | undefined


     test!: Subscription

     //--------------------------------------------------------------------------------------------
     constructor() {
         this.buildForm()
     }
     //--------------------------------------------------------------------------------------------
     private buildForm() {

         this.form = this.formBuilder.group ({
             email: ['', Validators.compose([Validators.email, Validators.required])],
             password: ['',[Validators.required]],
         })
     }

     //--------------------------------------------------------------------------------------------

     get emailField() {
         return this.form.get('email')
     }
     get passwordField() {
         return this.form.get('password')
     }

     //--------------------------------------------------------------------------------------------

     login() {

         this.statusForm.set(this.form.invalid)

         if (this.form.valid) {
             const user: UserToLog = {
                 email: this.form.value.email,  //'john@mail.com',
                 password: this.form.value.password //'changeme'
             }
             this.userService.logIn(user).subscribe({
                 next: (token: string) => {

                     this.token.set(token)
                     this.localStorageService.setItem('token', JSON.stringify(token))
                     this.localStorageService.setItem('currentUser', JSON.stringify(this.form.value.email))

                     this.store.setUser(this.form.value.email)

                     console.log('Store:', this.store.user())

                     this.ref.close(this.formBuilder)
                     this.router.navigate(['dashboard/products-store'])

                 }, error: (error: any) => {
                     console.log(error)
                     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.statusText
                    })
                 }
             })
         }
     }

     // -------------------------------------------------------------------------------------------

     callRegister () {
         this.ref.close(this.formBuilder)
         this.router.navigate([''])
         this.refRegister = this.dialogService.open(RegisterComponent, {
             header: 'Crear cuenta',
             width: '30vw',
             height: '27vw',
             contentStyle: { overflow: 'hidden' },
             modal:true,
             breakpoints: {
                 '960px': '75vw',
                 '640px': '90vw'
             },
         })
     }
     //--------------------------------------------------------------------------------------------
     ngOnDestroy() {
         if (this.ref) {
             this.ref.close();
         }
     }
     // -------------------------------------------------------------------------------------------

 }

