import { Component } from '@angular/core';
import { CustomerService } from './customer-service';
import { Customer } from './customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from 'ngx-bootstrap';

@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {

    constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) { }

    errors: any = [];
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
            'nome': new FormControl(this.customer.nome, Validators.compose([
                Validators.required
            ])),
            'rg': new FormControl(this.customer.rg, Validators.compose([
                Validators.required,
                Validators.pattern(/[0-9]{6}/)
            ])),
            'cpf': new FormControl(this.customer.cpf, Validators.compose([
                Validators.required,
                Validators.pattern(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/)
            ])),
            'telefone': new FormControl(this.customer.telefone, Validators.compose([
                Validators.required,
                Validators.pattern(/\([0-9]{2}\) [0-9]{4}\-[0-9]{4}/)
            ])),
            'dt_nascimento': new FormControl(this.customer.dt_nascimento, Validators.compose([
                Validators.required,
                Validators.pattern(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
            ]))
        });
    }

    onClosed(dismissedAlert: AlertComponent): void {
        this.errors = this.errors.filter(alert => alert !== dismissedAlert);
    }

    onError(err: HttpErrorResponse){
        if(err.status == 422){
            this.errors = Object.keys(err.error.errors).map(function (key) { return err.error.errors[key][0]; });
        }
    }

    onSubimit(event) {
        if (this.customer.id) {
            this.customerService.updateCustomer(this.customer.id, this.customerForm.value).subscribe(c => {
                this.router.navigate(['customers']);
            }, (err) => this.onError(err));
        } else {
            this.customerService.createCustomer(this.customerForm.value).subscribe(c => {
                this.router.navigate(['customers']);
            }, (err) => this.onError(err));
        }
    }
}