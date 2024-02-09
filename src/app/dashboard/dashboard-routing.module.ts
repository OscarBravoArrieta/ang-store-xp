 import { NgModule } from '@angular/core'
 import { RouterModule, Routes } from '@angular/router'
 import { ProductStoreComponent } from './components/product-store/product-store.component'

 const routes: Routes = [
     {
         path: 'products-store',
         component: ProductStoreComponent
     }
 ]

 @NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
 })
 export class DashboardRoutingModule { }
