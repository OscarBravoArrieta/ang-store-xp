 import { Component, SimpleChanges, signal, effect, Injector, computed } from '@angular/core'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { inject } from '@angular/core'
 import { RouterLinkWithHref } from '@angular/router'
 import { Router } from '@angular/router'
 import { CommonModule } from '@angular/common'
 import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
 import { LoginComponent } from '../../../auth/components/login/login.component'
 import { LocalStorageService } from '../../../services/local-storage.service'
 import { MenuItem } from 'primeng/api'
 import { UsersService } from '../../../services/users.service'
 import { CartService } from '../../../services/cart.service'
 import { Product } from '../../../../models/product.model'

 import { AuthStore } from '../../../auth/auth.store'

 @Component({
     selector: 'app-header',
     standalone: true,
     imports: [
         PrimengModule,
         RouterLinkWithHref,
         CommonModule],
     templateUrl: './header.component.html',
     styleUrl: './header.component.scss',
     providers: [DialogService, AuthStore]
 })
 export class HeaderComponent {

     public userService = inject(UsersService)
     private router = inject(Router)
     private dialogService = inject(DialogService)
     localStorageService = inject(LocalStorageService)
     private cartService = inject(CartService)
     private store = inject(AuthStore);
     injector = inject(Injector)
     ref: DynamicDialogRef | undefined
     items: MenuItem[] = [];
     products = signal<Product[]>([])

     cart = this.cartService.cart
     //total = this.cartService.total
     sidebarVisible = false
     outlined: boolean = true;
     productsInCart: any

     //--------------------------------------------------------------------------------------------

     constructor() {}

     //--------------------------------------------------------------------------------------------
     total = computed(() => {
        const cart = this.cart()
        return cart.reduce((total, product) => total + product.price, 0)
     })

     ngOnChanges(changes: SimpleChanges) {
        console.log('Changes...',changes)

     }

     //--------------------------------------------------------------------------------------------

     ngOnInit() {

         const currentUser =  this.localStorageService.getItem('currentUser') || ''

         this.items = [
             {label: currentUser, disabled: true },
             {label: 'Logout', icon: 'pi pi-sign-out', command: (event) => {
                     this.userService.logout()
                     this.callLogin()
                 }
             }
         ]


     }
     //--------------------------------------------------------------------------------------------

     callLogin() {

         this.router.navigate([''])
         this.ref = this.dialogService.open(LoginComponent, {
             header: 'Iniciar sesión',
             //width: '25vw',
             modal:true,
             breakpoints: {
                 '960px': '75vw',
                 '640px': '90vw'
             },
         })

     }
     //--------------------------------------------------------------------------------------------

     ngOnDestroy() {
         if (this.ref) {
             this.ref.close();
         }
     }

     //--------------------------------------------------------------------------------------------

     trackProducts() {

         effect (() => {
             const products = this.products()
             this.localStorageService.setItem('products', JSON.stringify(products))
         }, { injector: this.injector })

     }

     //--------------------------------------------------------------------------------------------

     setLocalStorage() {

         const storage = this.localStorageService.getItem('products')
         if (storage) {
             const products = JSON.parse(storage)
             this.products.set(products)
         }
         this.trackProducts()
         console.log('setLocalStorage')

     }
 }
