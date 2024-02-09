 import { Injectable, Injector, inject } from '@angular/core'

 @Injectable({
     providedIn: 'root'
 })
 export class LocalStorageService {
    injector = inject(Injector)

     constructor() { }

     //--------------------------------------------------------------------------------------------

     setItem(key: string, value: string): void { // Set a value in local storage
         localStorage.setItem(key, JSON.stringify(value))
     }

     //--------------------------------------------------------------------------------------------

     getItem(key: string ): string | null { // Get a value from local storage
         let value = null

         if (typeof window !== 'undefined') {
             const storage = localStorage.getItem(key) ? localStorage.getItem(key) : null;
             if (storage) {
                 value = JSON.parse(storage)
             }
         }
         return value

     }

     //--------------------------------------------------------------------------------------------

     removeItem(key: string): void { // Remove a value from local storage
         localStorage.removeItem(key)
     }

     //--------------------------------------------------------------------------------------------

     clear(): void { // Clear all items from local storage
         localStorage.clear()
     }
     //--------------------------------------------------------------------------------------------
 }
