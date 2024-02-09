 import { Component, inject, signal } from '@angular/core'
 import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { UsersService } from '../../../services/users.service'
 import { User, Email, EmailIsAvailable, UserToLog } from '../../../../models/user.model'
 import { MessageService } from 'primeng/api'
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
     private userService = inject(UsersService)
     private localStorageService = inject(LocalStorageService)
     private router = inject(Router)
     private messageService = inject (MessageService)
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
             email: [
                 null,
                 Validators.compose(
                     [
                         Validators.email,
                         Validators.required
                     ]
                 )
             ],
             name: [
                 null,
                 Validators.compose(
                     [
                         Validators.required,
                         Validators.minLength(8)
                     ]
                 )
             ],
             password: [
                 null,
                 Validators.compose(
                     [
                         Validators.minLength(8),
                         Validators.required,
                         //Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'),

                     ]
                 )
             ],
             passwordConfirm: [
                 null,
                 Validators.compose(
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
             validator: this.checkPasswords
         })
     }

     // -------------------------------------------------------------------------------------------

     checkPasswords(group: FormGroup) { // here we have the 'passwords' group

         let pass = group.controls.password.value;
         let confirmPass = group.controls.passwordConfirm.value;
         if (pass === confirmPass) {
             return null
         }else {
             group.controls.passwordConfirm.setErrors({ NoPassswordMatch: true });
             return { notSame: true }
         }

     }

     //--------------------------------------------------------------------------------------------
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
         if (!this.form.valid) { return }

         const userToCreate: User = {
             email: this.form.value.email,
             password: this.form.value.password,
             name: this.form.value.name,
             role: this.form.value.role.code,
             avatar: this.form.value.avatar
         }

         this.userService.createUser(userToCreate).subscribe({
             next: (newUser: User) => {
                 console.log(newUser)
                 const newUserLog: UserToLog = {
                     email: newUser.email,
                     password: newUser.password
                 }
                 this.login(newUserLog);
                 this.ref.close(this.formBuilder)
                 this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cuenta creada!' })

                 //this.router.navigate(['dashboard/products-store'])
             }, error: (error: any) => {
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
         this.userService.checkEmail(objectEmail).subscribe({
             next: (emailIsAvailable: EmailIsAvailable) => {
                 this.emailIsAvailable.set(emailIsAvailable.isAvailable)

             }, error: (error: any) => {
                 this.messageService.add({ severity: 'error', summary: 'Error', detail: error.statusText })
            }
         })
     }

     // -------------------------------------------------------------------------------------------

     login(newUserLog: UserToLog) {
        this.userService.logIn(newUserLog).subscribe({
             next: (token: string) => {
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
