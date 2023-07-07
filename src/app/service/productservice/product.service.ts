import { Injectable } from '@angular/core';
import { ProductsModel } from '../../component/table/entity/Product.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly urlp: string;

  constructor(private httpClient: HttpClient) {
    this.urlp = `${environment.baseUrl}/products`;
  }

  getProduct(): Observable<ProductsModel[]> {
    return this.httpClient.get<ProductsModel[]>(this.urlp);
  }

  createProduct(
    newProduct: Omit<ProductsModel, 'active'>
  ): Observable<ProductsModel> {
    const product: Omit<ProductsModel, 'id'> = {
      ...newProduct,
      active: false,
    };

    return this.httpClient.post<ProductsModel>(this.urlp, product);
  }

  GetProductbycode(id: any): Observable<any> {
    const url = `${this.urlp}/${id}`;

    // Replace 'products1' with 'products' and include the specific 'id'
    return this.httpClient.get(url);
  }
  Saveproduct(data: any) {
    return this.httpClient.post(this.urlp, data);
  }

  editProduct(product: ProductsModel): Observable<ProductsModel> {
    return this.httpClient.put<ProductsModel>(
      `${this.urlp}/${product.id}`,
      product
    );
  }

  GetProduct(): Observable<ProductsModel[]> {
    return this.httpClient.get<ProductsModel[]>(this.urlp);
  }

  ondelete(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.urlp}/${productId}`).pipe(
      map(() => {
        return productId;
      })
    );
  }
}
