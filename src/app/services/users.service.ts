 import { HttpClient } from '@angular/common/http'
 import { Injectable, inject } from '@angular/core'
 import { User, Email, UserToLog, EmailIsAvailable } from '../../models/user.model'
 import { LocalStorageService } from './local-storage.service'



 @Injectable({
     providedIn: 'root'
 })
 export class UsersService {

     private http = inject(HttpClient)
     private localStorageService = inject(LocalStorageService)


     //--------------------------------------------------------------------------------------------

     getUsers() {

        return this.http.get<User[]>(`https://api.escuelajs.co/api/v1/users`)
     }

     //--------------------------------------------------------------------------------------------

     getUser(id: number) {

         return this.http.get<User>(`https://api.escuelajs.co/api/v1/users/${id}`)

     }

     //--------------------------------------------------------------------------------------------

     createUser(user: User) {

         return this.http.post<User>(`https://api.escuelajs.co/api/v1/users`, user)

     }
     //--------------------------------------------------------------------------------------------

     logIn(user: UserToLog): any {

         return this.http.post<UserToLog>(`https://api.escuelajs.co/api/v1/auth/login/`, user)

     }

     //--------------------------------------------------------------------------------------------

     userLogged() {

         return this.localStorageService.getItem('access_token') !== null
     }

     //--------------------------------------------------------------------------------------------
     checkEmail (objectEmail: Email) {

         return this.http.post<EmailIsAvailable>(`https://api.escuelajs.co/api/v1/users/is-available`, objectEmail)

     }
     //--------------------------------------------------------------------------------------------
     logout() {

         this.localStorageService.removeItem('access_token')
         this.localStorageService.removeItem('refresh_token')
         this.localStorageService.removeItem('currentUser')

     }

     //--------------------------------------------------------------------------------------------


 }
