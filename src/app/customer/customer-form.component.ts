import { Component } from '@angular/core';
import { CustomerService } from './customer-service';
import { Customer } from './customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {

    constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) { }

    customerForm: FormGroup;
    title: string = 'Formulário';
    customer: Customer;
    readonly: boolean = false;
    mask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    rgMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    ngOnInit(): void {
        this.activatedRoute
            .data
            .subscribe(v => {
                this.title = v.title;
                this.readonly = v.readonly || false;
            });

        this.customer = (this.activatedRoute.snapshot.data['customer'] as Customer) || {};
        var datePipe = new DatePipe('en');
        this.customer.dt_nascimento = datePipe.transform(this.customer.dt_nascimento, 'dd/MM/yyyy');

        this.customerForm = new FormGroup({
            'nome': new FormControl(this.customer.nome, Validators.compose([Validators.required])),
            'rg': new FormControl(this.customer.rg, Validators.compose([Validators.required])),
            'cpf': new FormControl(this.customer.cpf, Validators.compose([Validators.required])),
            'telefone': new FormControl(this.customer.telefone, Validators.compose([Validators.required])),
            'dt_nascimento': new FormControl(this.customer.dt_nascimento, Validators.compose([Validators.required]))
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