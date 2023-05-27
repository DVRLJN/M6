import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    productImageUrl: string='';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(environment.api_key)
    });
    return this.http.get(`${environment.api}/products?display=[id,name,price,description,id_default_image]&output_format=JSON`, { headers });
  }

  getProductById(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(environment.api_key)
    });
    return this.http.get(`${environment.api}/products/${productId}?display=[id,name,price,description,id_default_image]&output_format=JSON`, { headers });
  }
  
  getImage(idProduct: any, idImage: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(environment.api_key)
    });
  
    return this.http.get(`${environment.api}/images/products/${idProduct}/${idImage}?output_format=JSON`, { headers, responseType: 'blob' });
  }


  }
  
  

