 import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms'
 import { inject } from '@angular/core'
 import { UsersService } from '../services/users.service'
 import { Email } from '../../models/user.model'
 export class CustomValidations {

     public usersService = inject(UsersService)

     static PasswordMatch(group: FormGroup) {


         let pass = group.controls.password?.value
         let confirmPass = group.controls.passwordConfirm?.value
         console.log('Password: ',pass)
         if (pass === confirmPass) {
             return null
         }else {
             group.controls.passwordConfirm.setErrors({ NoPassswordMatch: true });
             return { notSame: true }
         }
     }

     // -------------------------------------------------------------------------------------------

     checkEmail (objectEmail: Email) {

         return this.usersService.checkEmail(objectEmail)

     }

     // -------------------------------------------------------------------------------------------
 }
