 import { Component, inject, signal, Input, SimpleChanges } from '@angular/core'
 import { CommonModule } from '@angular/common'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { CategoriesService } from '../../../services/categories.service'
 import { ProductsService } from '../../../services/products.service'
 import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
 import { RouterLinkWithHref } from '@angular/router'
 import { Category } from '../../../../models/category.model'
 import { Product } from '../../../../models/product.model'
 import { ProductDetailsComponent } from '../product-details/product-details.component'
 import { ChosenProductComponent } from '../chosen-product/chosen-product.component'

 @Component({
     selector: 'app-product-store',
     standalone: true,
     imports: [
         RouterLinkWithHref,
         PrimengModule,
         ProductDetailsComponent,
         CommonModule
     ],
     templateUrl: './product-store.component.html',
     styleUrl: './product-store.component.scss',
     providers: [DialogService]

 })
 export class ProductStoreComponent {

     products = signal<Product[]>([])
     categories = signal<Category[]>([])
     private productService = inject(ProductsService)
     private categoriesService = inject(CategoriesService)
     private dialogService = inject(DialogService)
     ref: DynamicDialogRef | undefined


     @Input() category_id?: string

     //--------------------------------------------------------------------------------------------

     ngOnInit() {

         this.getCategories()

     }

     //--------------------------------------------------------------------------------------------
     ngOnChanges(changes: SimpleChanges) {

         this.getProducts()

     }

     //-------------------------------------------------------------------------------------------

     showChosenProduct() {
         this.ref = this.dialogService.open(ChosenProductComponent, {
             header: 'Detalles del producto',
             modal: true,
             breakpoints: {
                 '960px': '75vw',
                 '640px': '90vw'
             }
         })

     }

     //--------------------------------------------------------------------------------------------
     addToCart(product: Product) {

         console.log('This method was emmited...', product)
     }


     //--------------------------------------------------------------------------------------------


     getProducts() {
         this.productService.getProducts(this.category_id).subscribe({
             next: (products) => {
                 this.products.set(products)
             }, error: () => {
                 //manage the posible error
             }
         })
     }

     //--------------------------------------------------------------------------------------------
     getCategories() {

        this.categoriesService.getAll().subscribe({
             next: (data) => {
                 this.categories.set(data)
             }, error: () => {
                 //manage the posible error
             }
         })
     }

     //--------------------------------------------------------------------------------------------

 }
