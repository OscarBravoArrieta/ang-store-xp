 import { Routes } from '@angular/router'
 import { LayoutComponent } from './layout/layout.component'

 export const routes: Routes = [
     {
         path: '',
         component: LayoutComponent,
         children: [
             {
                 path: 'auth',
                 loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
             },
             {
                 path: 'dashboard',
                 loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
             }

         ]
     },
 ]
