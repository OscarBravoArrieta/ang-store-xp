import { Category } from "./category.model"

 interface Rating {
     rate: number
     count: number
 }
 export interface ProductCart {

     id: number
     title: string
     price: number
     category: Category
     description: string
     images: []
     rating: Rating
     quantity: number
     subTotal: number
     creationAt: string


 }
