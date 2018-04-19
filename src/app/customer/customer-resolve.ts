import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Customer} from "./customer";
import {Observable} from "rxjs/Observable";
import {CustomerService} from "./customer-service";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomerResolve implements Resolve<Customer> {

    constructor(private CustomerService: CustomerService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> | Promise<Customer> | Customer {
        return this.CustomerService.getCustomer(route.paramMap.get('id'));
    }
}