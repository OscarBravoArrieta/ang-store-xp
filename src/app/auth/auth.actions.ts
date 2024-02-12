 import { createAction, props } from '@ngrx/store'
 import { UserToLog } from '../../models/user.model'

 export const setUser = createAction (
     '[Auth] stUser',
     props <{user: UserToLog}>())

 // -----------------------------------------------------------------------------------------------

 export const unSetUser = createAction(
     '[Auth] unSetUser'
 )

 // -----------------------------------------------------------------------------------------------






