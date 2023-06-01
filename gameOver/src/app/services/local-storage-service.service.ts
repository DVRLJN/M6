import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSub= new Subject<String>();
  watchStorage = this.storageSub.asObservable();

  constructor() { }
  getProductos(): any[] {
    const data:any = localStorage.getItem('productos');
    return JSON.parse(data);
  }
  setProductos(producto:any){
    let productosGuardados = [];
    const datosLocalStorage = localStorage.getItem('productos');
  
    if (datosLocalStorage) {
      try {
        productosGuardados = JSON.parse(datosLocalStorage);
      } catch (e) {
        console.error('Error al analizar los datos del LocalStorage:', e);
      }
    }
  
    productosGuardados.push({id: producto.id});
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
    this.storageSub.next('changed');
  }
  removeItem(index:number){
    const productosLocalStorage = JSON.parse(localStorage.getItem('productos') || '[]');
    productosLocalStorage.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productosLocalStorage));
    this.storageSub.next('changed');
  }
}
