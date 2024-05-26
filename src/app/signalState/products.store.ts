 import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
 import { Product } from "../../models/product.model"
 import { computed, inject } from "@angular/core"
 import { ProductsService } from "../services/products.service"
 import { rxMethod } from "@ngrx/signals/rxjs-interop"
 import { pipe, switchMap, tap } from "rxjs"


 type ProductsState = {

     products: Product[]
     //isLoading: boolean;

 }
 const initialState: ProductsState = {

     products: [],
     //isLoading: true

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
                 //patchState(store, {isLoading: true})
                 const products = productsService.getProducts()
                 patchState(store, {products})
                 
             },

             getOne() {

             }

     })

    )




 )
//https://ngrx.io/guide/signals/signal-store

// Reactive Store Methods
// In more complex scenarios, opting for RxJS to handle asynchronous side effects is advisable. To create a reactive SignalStore method that harnesses RxJS APIs, use the rxMethod function from the rxjs-interop plugin.