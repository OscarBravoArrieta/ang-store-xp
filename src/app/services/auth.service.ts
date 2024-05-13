 import { Injectable, inject } from '@angular/core'
 import { HttpClient } from '@angular/common/http'
 import { User, Email, UserToLog, EmailIsAvailable, Token } from '@models/user.model'
 import { environment } from '@environments/environment'
 import { LocalStorageService } from './local-storage.service'

 @Injectable({
     providedIn: 'root'
 })
 export class AuthService {

     private http = inject(HttpClient)
     private localStorageService = inject(LocalStorageService)

     apiUrl = environment.API_URL

     constructor() { }

     //--------------------------------------------------------------------------------------------

     logIn(user: UserToLog) {

         return this.http.post<Token>(`${this.apiUrl}/auth/login/`, user)

     }

     //--------------------------------------------------------------------------------------------

 }
