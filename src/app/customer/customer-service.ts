import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Paginator } from './paginator';
import { Customer } from './customer';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(page: number): Observable<Paginator<Customer>>{
    return this.http.get<Paginator<Customer>>(`${environment.baseURL}/customers`);
  }

  getCustomer(id: number): Observable<Customer>{
    return this.http.get<Customer>(`${environment.baseURL}/customers/${id}`);
  }

  updateCustomer(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${environment.baseURL}/customers/${customer.id}`, customer);
  }

  createCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(`${environment.baseURL}/customers`, customer);
  }

  deleteCustomer(id: number): Observable<Customer>{
    return this.http.delete<Customer>(`${environment.baseURL}/customers/${id}`);
  }
}