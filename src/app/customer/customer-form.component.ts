import { Component } from '@angular/core';
import { CustomerService } from './customer-service';
import { Customer } from './customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: 'customer-form',
    templateUrl: './customer.component.html'
})
export class CustomerFormComponent {

    constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) { }

    customerForm: any;
    title: string = 'Formulário';
    customer: Customer;
    readonly: boolean = false;

    ngOnInit(): void {
        this.readonly = this.activatedRoute.snapshot.data['readonly'];
        this.title = this.activatedRoute.snapshot.data['title'];
        this.customer = this.activatedRoute.snapshot.data['customer'];

        this.customerForm = new FormGroup({
            'nome': new FormControl(this.customer.nome, [
                Validators.required
            ])
        });
    }

    onSubimit() {
        if (this.customer.id) {
            this.customerService.updateCustomer(this.customer).subscribe(c => {
                this.router.navigate(['customers']);
            });
        } else {
            this.customerService.createCustomer(this.customer).subscribe(c => {
                this.router.navigate(['customers']);
            });
        }
    }
}