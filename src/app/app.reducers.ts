 import { ActionReducerMap } from "@ngrx/store"
 import * as auth from './auth/auth.reducers'

 export interface AppState {

     user: auth.State

 }

 //------------------------------------------------------------------------------------------------\

 export const appReducers: ActionReducerMap<AppState> = {

     user: auth.authReducer,

 }

 //------------------------------------------------------------------------------------------------
