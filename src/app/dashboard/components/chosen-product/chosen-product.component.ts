 import { Component, signal, inject, EventEmitter, Output } from '@angular/core'
 import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
 import { ProductsService } from '../../../services/products.service'
 import { CartService } from '../../../services/cart.service'
 import { Product } from '../../../../models/product.model'

 @Component({
     selector: 'app-chosen-product',
     standalone: true,
     imports: [FormsModule, ReactiveFormsModule, PrimengModule],
     templateUrl: './chosen-product.component.html',
     styleUrl: './chosen-product.component.scss'
 })
 export class ChosenProductComponent {

     @Output() addToCart = new EventEmitter()

     private formBuilder = inject (FormBuilder)
     private ref = inject (DynamicDialogRef)
     private dynamicDialogConfig = inject (DynamicDialogConfig)
     private productService = inject(ProductsService)
     private cartService = inject(CartService)

     form!: FormGroup
     statusForm = signal(false)
     cover = signal('')
     idProduct = '';
     //product = signal<Product | null>(null)
     product = signal<Product | null>(null)
     //cart    = signal<Product[]>([])
     images = signal([])

     //--------------------------------------------------------------------------------------------

         constructor() {
         this.buildForm()

     }
     //--------------------------------------------------------------------------------------------

     ngOnInit() {

         if (this.dynamicDialogConfig.data) {
             this.idProduct = this.dynamicDialogConfig.data.idProduct
             this.getOne()
         }

     }

     //--------------------------------------------------------------------------------------------

     private buildForm() {

         this.form = this.formBuilder.group ({
             title: ['',[Validators.required]],
             price: ['',[Validators.required]],
             description: ['',[Validators.required]],
             category: ['',[Validators.required]],
             images: ['',[Validators.required]],
             quantity: ['1',[Validators.required]]
         })

     }

     //--------------------------------------------------------------------------------------------

     get titleField() {

        return this.form.get('title')

     }

     get priceField() {

        return this.form.get('price')

     }

     get descriptionField() {

         return this.form.get('description')

     }

     get categoryField() {

         return this.form.get('category')

     }

     get imagesField() {

         return this.form.get('images')

     }

     get quantityField() {

         return this.form.get('quantity')

     }

     // --------------------------------------------------------------------------------------------
     getOne () {

         this.productService.getOne(this.idProduct).subscribe({
             next: (product: Product) => {
                 this.product.set(product)
                 if (product.images.length > 0) {
                     this.cover.set(product.images[0])
                 }
                 this.form.patchValue(product)
             }
         })

     }

     //--------------------------------------------------------------------------------------------

     addToCartHandler() {

         const product = this.product()
         if (product) {
             this.cartService.addToCart(product)
         }
         this.ref.close(this.formBuilder)
     }

     //--------------------------------------------------------------------------------------------

     changeCover(newImg: string) {

         this.cover.set(newImg)

     }
     //--------------------------------------------------------------------------------------------

 }
