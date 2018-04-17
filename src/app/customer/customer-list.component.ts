import { Component } from '@angular/core';
import { CustomerService } from './customer-service';
import { Paginator } from './paginator';
import { Customer } from './customer';


@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {

  constructor(private customerService: CustomerService) { }

  perPage: any = 5;
  paginator: Paginator<Customer> = { current_page: 1 };

  ngOnInit(): void {
    this.customerService.getCustomers(this.paginator.current_page, this.perPage).subscribe((p) => {
      this.paginator = p;
    });
  }

  pageChanged($event) {
    this.customerService.getCustomers($event.page, this.perPage).subscribe((p) => {
      this.paginator = p;
    });
  }

  refresh() {
    this.customerService.getCustomers(this.paginator.current_page, this.perPage).subscribe((p) => {
      this.paginator = p;
    });
  }

  deletar(c: Customer) {
    this.customerService.deleteCustomer(c.id).subscribe((c) => {
      this.refresh();
    })
  }

}