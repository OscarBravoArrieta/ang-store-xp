 import { computed, inject } from "@angular/core"
 import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
 import { UsersService } from "../services/users.service"

 type userState = {

     user: string

 } // SignalState: https://ngrx.io/guide/signals/signal-state

 // -----------------------------------------------------------------------------------------------

 const initialState: userState = {

     user: ''

 }

 // -----------------------------------------------------------------------------------------------

 export const AuthStore = signalStore(
     {providedIn: 'root'},
     withState(initialState),
     withMethods(
         (store, usersService = inject(UsersService))=> ({
             setUser(user: string) {

                 patchState(store, {user})

             }
         })
     )
 )
 // -----------------------------------------------------------------------------------------------
