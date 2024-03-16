 import { Injectable, Injector, inject, computed, signal, effect } from '@angular/core'
 import { LocalStorageService } from './local-storage.service'
 import { Product } from '../../models/product.model'


 @Injectable({
     providedIn: 'root'
 })
 export class CartService {
     cart = signal<Product[]>([])
     product = signal<Product[]>([])
     //products = signal<Product[]>([])

     injector = inject(Injector)
     private localStorageService = inject(LocalStorageService)
     //--------------------------------------------------------------------------------------------

     total = computed(() => {
         const cart = this.cart()
         return cart.reduce((total, product) => total + product.price, 0)
     })

     //--------------------------------------------------------------------------------------------
     addToCart(product: Product) {

         this.cart.update(products => [...products, product])
         this.trackProducts()

     }

     //--------------------------------------------------------------------------------------------

     trackProducts() {

         effect (() => {
             const products = this.cart()
             this.localStorageService.setItem('products', products)
         }, { injector: this.injector })

     }

     //--------------------------------------------------------------------------------------------
     productsInCart () {

         computed(() => {
             const cart = this.cart()
             return cart.reduce((total, product) => total + product.price, 0)
         })

     }

 }
