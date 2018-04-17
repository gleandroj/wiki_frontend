import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Paginator } from './paginator';
import { Customer } from './customer';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(page: any, perPage: any): Observable<Paginator<Customer>>{
    return this.http.get<Paginator<Customer>>(`${environment.baseURL}/customers/paginate?page=${page}&perPage=${perPage}`);
  }

  getCustomer(id: any): Observable<Customer>{
    return this.http.get<Customer>(`${environment.baseURL}/customers/${id}`);
  }

  updateCustomer(id: any, data: any): Observable<Customer>{
    return this.http.put<Customer>(`${environment.baseURL}/customers/${id}`, data);
  }

  createCustomer(customer: any): Observable<Customer>{
    return this.http.post<Customer>(`${environment.baseURL}/customers`, customer);
  }

  deleteCustomer(id: any): Observable<Customer>{
    return this.http.delete<Customer>(`${environment.baseURL}/customers/${id}`);
  }
}