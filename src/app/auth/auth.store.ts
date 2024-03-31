 import { computed, inject } from "@angular/core"
 import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
 import { User, UserToLog } from "../../models/user.model"
 import { UsersService } from "../services/users.service"

 type userState = {

     users: User[]

 }


 
 // -----------------------------------------------------------------------------------------------

 const initialState: userState = {
     
     users: []

 }
 
 // -----------------------------------------------------------------------------------------------

 export const UserStore = signalStore(
     {providedIn: 'root'},
     withState(initialState),
     withMethods(
         (store, usersService = inject(UsersService))=> ({
             getUsers() {
                
                 usersService.getUsers().subscribe((data: User[]) =>({
                      constusers: [] = data
                    //   patchState(store, {users})

                 }))
                 

             }
         })
     )
 )
 // -----------------------------------------------------------------------------------------------