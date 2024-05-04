import { provideStoreDevtools } from '@ngrx/store-devtools'
 export const environment = {
     production: false,
     serverUrl: 'https://api.escuelajs.co/api/v1',
     providers: [
         provideStoreDevtools({ maxAge: 25 })
    ],
 }
