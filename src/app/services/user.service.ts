import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/Order';
import { CheckRequest } from '../model/CheckRequest';
import { Food } from '../model/Food';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

 // private userUrl = 'http://localhost:8080/api/test/user';
 // private pmUrl = 'http://localhost:8080/api/test/pm';
 // private adminUrl = 'http://localhost:8080/api/test/admin';
  private orderUrl = 'http://localhost:8080/api/food/saveorder';
  private bussyUrl = 'http://localhost:8080/api/table/checktable';
  private foodUrl = 'http://localhost:8080/api/food/getfood';
  private addfoodUrl = 'http://localhost:8080/api/food/addfood';
  private deletefoodUrl = 'http://localhost:8080/api/food/deletefood';
  private updatefoodUrl = 'http://localhost:8080/api/food/updatefood';
  constructor(private http: HttpClient) { }

 

  postOrder(orderinfo: Order): Observable<string> {
    return this.http.post<string>(this.orderUrl, orderinfo, httpOptions);
  }
  isBussy(data: CheckRequest): Observable<string> {
    return this.http.post<string>(this.bussyUrl, data, httpOptions);
  }
  getFood(): Observable<any> {
    return this.http.get(this.foodUrl, httpOptions);
  }
  addFood(food: Food): Observable<string> {
    return this.http.post<string>(this.addfoodUrl, food, httpOptions);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.deletefoodUrl,httpOptions);
  }
  updateFood(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.updatefoodUrl}/${id}`, value);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.deletefoodUrl}/${id}`, httpOptions);
  }


}
