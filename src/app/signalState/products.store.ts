 import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
 import { Product } from "../../models/product.model"
 import { computed, inject } from "@angular/core"
 import { ProductsService } from "../services/products.service"
 import { rxMethod } from "@ngrx/signals/rxjs-interop"
 import { pipe, switchMap, tap } from "rxjs"


 interface ProductsState {

     products: Product[]
     state: 'Cargando' | 'Cargado' | 'Error'

 }
 const initialState: ProductsState = {

     products: [],
     state: 'Cargando'

 }

 export const ProductStore = signalStore (

     { providedIn:'root'},
     withState(initialState),
     withComputed(({products}) => ({
         products: computed(() => products()),
         productsCount: computed(() => products().length)
     })),
     withMethods(
         (store, productsService = inject(ProductsService)) => ({

             getProducts(){
                 patchState(store, {state: 'Cargando'})
                 const products = productsService.getProducts()
                 //patchState(store, {products})

             },

             getOne() {

             }

     })

    )




 )
