 import { Component, inject, signal } from '@angular/core'
 import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { AuthService } from '@services/auth.service'
 import { User, Email, EmailIsAvailable, UserToLog, Token} from '@models/user.model'
 import { RequestStatus } from '@models/request-status.model'
 import { MessageService } from 'primeng/api'
 import { CustomValidators } from '@utils/custom-validations'
 import { LocalStorageService } from '../../../services/local-storage.service'
 import { RouterLinkWithHref } from '@angular/router'
 import { Router } from '@angular/router'
 import { DynamicDialogRef } from 'primeng/dynamicdialog'


 interface Rol {
     name: string
     code: string
 }

 @Component({
     selector: 'app-register',
     standalone: true,
     imports: [FormsModule, ReactiveFormsModule, PrimengModule, RouterLinkWithHref],
     templateUrl: './register.component.html',
     styleUrl: './register.component.scss',
     providers: [MessageService ]
 })
 export class RegisterComponent {
     private formBuilder = inject (FormBuilder)
     private authService = inject(AuthService)
     private localStorageService = inject(LocalStorageService)
     private router = inject(Router)
     private messageService = inject (MessageService)
     status: RequestStatus = 'init'
     form!: FormGroup
     roles: Rol[] | undefined
     selectedRol: Rol | undefined
     private ref = inject (DynamicDialogRef)

     //--------------------------------------------------------------------------------------------
     statusForm = signal(false)
     emailIsAvailable = signal(false)

     constructor() {
         this.buildForm()
     }
     //--------------------------------------------------------------------------------------------

     ngOnInit() {

         this.roles = [
             { name: 'customer', code: 'customer' },
             { name: 'admin', code: 'admin' }
         ]
     }

     //---------------------------------------------------------------------------------------------

     private buildForm() {

         this.form = this.formBuilder.group ({
             email: [null, Validators.compose(
                     [
                         Validators.email,
                         Validators.required
                     ]
                 )
             ],
             name: [null, Validators.compose(
                     [
                         Validators.required,
                         Validators.minLength(8)
                     ]
                 )
             ],
             password: [ null,
                 Validators.compose( [
                         Validators.minLength(8),
                         Validators.required,
                         //Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),

                     ]
                 )
             ],
             passwordConfirm: [ null, Validators.compose(
                     [
                         Validators.minLength(8),
                         Validators.required,
                     ]
                 )
             ],
             role: [
                 null,
                 Validators.compose(
                     [
                         Validators.required]
                     )
                 ],
             avatar: [
                 null,
                 Validators.compose(
                     [
                         Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
                     ]
                 )
             ],
         }, {
            validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
         })
     }

     // -------------------------------------------------------------------------------------------

     get emailField() {
         return this.form.get('email')
     }
     get nameField() {
         return this.form.get('name')
     }
     get passwordField() {
         return this.form.get('password')
     }
     get roleField() {
         return this.form.get('role')
     }
     get avatarField() {
         return this.form.get('avatar')
     }

     //--------------------------------------------------------------------------------------------
     register() {

         this.statusForm.set(this.form.invalid)
         this.status = 'loading'
         if (!this.form.valid) { return }

         const userToCreate: User = {
             email: this.form.value.email,
             password: this.form.value.password,
             name: this.form.value.name,
             role: this.form.value.role.code,
             avatar: this.form.value.avatar
         }

         this.authService.createUser(userToCreate).subscribe({
             next: (newUser: User) => {
                 const newUserLog: UserToLog = {
                     email: newUser.email,
                     password: newUser.password
                 }
                 this.status = 'success';
                 this.login(newUserLog);
                 this.ref.close(this.formBuilder)
                 this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cuenta creada!' })

                 //this.router.navigate(['dashboard/products-store'])
             }, error: (error: any) => {
                this.status = 'failed'
                 console.log('error-> ', error.error.message)
                 this.messageService.add({ severity: 'error', summary: 'Error', detail: error.statusText })
            }


         })
     }
     //--------------------------------------------------------------------------------------------

     checkEmail(email: string) {
         const objectEmail: Email = {
             email
         }
         this.authService.checkEmail(objectEmail).subscribe({
             next: (emailIsAvailable: EmailIsAvailable) => {
                 this.emailIsAvailable.set(emailIsAvailable.isAvailable)

             }, error: (error: any) => {
                 this.messageService.add({ severity: 'error', summary: 'Error', detail: error.statusText })
            }
         })
     }

     // -------------------------------------------------------------------------------------------

     login(newUserLog: UserToLog) {
        this.authService.logIn(newUserLog).subscribe({
             next: (token: Token) => {
                 this.localStorageService.setItem('token', JSON.stringify(token))
                 this.localStorageService.setItem('currentUser', JSON.stringify(this.form.value.email))
                 this.router.navigate(['dashboard/products-store'])
             }, error: (error: any) => {
                 console.log(error)

            }
        })

     }

     // -------------------------------------------------------------------------------------------

 }
