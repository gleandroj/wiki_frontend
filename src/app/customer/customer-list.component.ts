import { Component } from '@angular/core';
import { CustomerService } from './customer-service';
import { Paginator } from './paginator';
import { Customer } from './customer';


@Component({
  selector: 'customer-list',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerListComponent {

  constructor(private customerService: CustomerService) { }

  paginator: Paginator<Customer> = { current_page: 0 };

  ngOnInit(): void {
    this.customerService.getCustomers(this.paginator.current_page++).subscribe((p) => {
      this.paginator = p;
    });
  }

  pageChanged($event){
    this.customerService.getCustomers(this.paginator.current_page).subscribe((p) => {
      this.paginator = p;
    });
  }

}