 import { bootstrapApplication } from '@angular/platform-browser'
 import { appConfig } from './app/app.config'
 import { AppComponent } from './app/app.component'
 import { importProvidersFrom } from '@angular/core'
 import { provideStore, provideState } from '@ngrx/store'
 import { authReducer } from './app/auth/auth.reducers'

 import { StoreModule } from '@ngrx/store'
 import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools'
 import { appReducers } from './app/app.reducers'

 bootstrapApplication(AppComponent, appConfig)
     .catch((err) => console.error(err))
     providers: [
         provideStore(),
         provideStoreDevtools({
             maxAge: 25,
             logOnly: true,
             connectInZone: true
         }),

     ]


