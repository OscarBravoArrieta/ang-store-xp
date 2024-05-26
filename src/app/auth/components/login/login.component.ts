 import { Component, inject, signal, effect, Injector } from '@angular/core'
 import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { PrimengModule } from '@primeng/primeng.module'
 import { MessageService } from 'primeng/api'
 import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
 import { AuthService } from '@services/auth.service'
 import { UserToLog, Token  } from '@models/user.model'
 import { RequestStatus } from '@models/request-status.model'
 import { LocalStorageService } from '../../../services/local-storage.service'
 import { RouterLinkWithHref } from '@angular/router'
 import { Router } from '@angular/router'
 import { RegisterComponent } from '../register/register.component'

 import { AuthStore } from '../../../signalState/auth.store'
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
     private authService = inject(AuthService)
     private localStorageService = inject(LocalStorageService)
     private store = inject(AuthStore);
     private router = inject(Router)

     private messageService = inject (MessageService)
     private ref = inject (DynamicDialogRef)

     form!: FormGroup
     statusForm = signal(false)
     token!: Token
     injector = inject(Injector)

     refRegister: DynamicDialogRef | undefined
     status: RequestStatus = 'init'


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
             this.status = 'loading'
             const user: UserToLog = {
                 email: this.form.value.email,  //'john@mail.com',
                 password: this.form.value.password //'changeme'
             }
             this.authService.logIn(user).subscribe({
                 next: (token) => {
                     this.token = token
                     this.store.setUser(this.form.value.email)
                     this.trackUser()
                     this.ref.close(this.formBuilder)
                     this.router.navigate(['dashboard/products-store'])
                 }, error: (error: any) => {
                     this.status = 'failed'
                     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.statusText})
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
     trackUser() {
         effect (() => {
             const currentUser = this.store.user()
             this.localStorageService.setItem('currentUser', currentUser)
             this.localStorageService.setItem('access_token', this.token.access_token)
             this.localStorageService.setItem('refresh_token', this.token.refresh_token)
         }, { injector: this.injector })
     }

 }

