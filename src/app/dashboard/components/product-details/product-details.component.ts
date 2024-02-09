 import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
 import { CommonModule } from '@angular/common'
 import { PrimengModule } from '../../../primeng/primeng.module'
 import { Product } from '../../../../models/product.model'
 import { RouterLinkWithHref } from '@angular/router'
 import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
 import { ChosenProductComponent } from '../chosen-product/chosen-product.component'


 @Component({
     selector: 'app-product-details',
     standalone: true,
     imports: [CommonModule, RouterLinkWithHref, PrimengModule],
     templateUrl: './product-details.component.html',
     styleUrl: './product-details.component.scss',
     providers: [DialogService]
 })
 export class ProductDetailsComponent {
     @Input({ required: true } ) product!: Product
     @Output() addToCart = new EventEmitter()

     ref: DynamicDialogRef | undefined
     private dialogService = inject(DialogService)
     // -------------------------------------------------------------------------------------------

     addToCartHandler() {

         this.addToCart.emit(this.product.title)
     }

     // -------------------------------------------------------------------------------------------

     callChesenProduct() {

         this.ref = this.dialogService.open(ChosenProductComponent, {
             data: {
                 idProduct: this.product.id
             },
             header: 'Agregar Producto',
             width: '50%',
             height: '100%',
             modal:true,
             contentStyle: {"max-height": "500px", "min-height": "500px", "overflow": "auto"},
             breakpoints: {
                 '960px': '75vw',
                 '640px': '90vw'
             },
         })

     }

     // -------------------------------------------------------------------------------------------



 }
