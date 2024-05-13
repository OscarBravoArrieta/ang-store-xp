 import { provideStoreDevtools } from '@ngrx/store-devtools'
 export const environment = {
     production: false,
     API_URL: 'https://api.escuelajs.co/api/v1',
     providers: [
         provideStoreDevtools({ maxAge: 25 })
     ],
 };
