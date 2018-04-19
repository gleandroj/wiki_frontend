import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerFormComponent } from './customer/customer-form.component';
import { CustomerResolve } from './customer/customer-resolve';

const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    { path: 'customers', component: CustomerListComponent },
    { path: 'customers/cadastrar', component: CustomerFormComponent,  resolve: {title: 'Cadastrar', customer: null, readonly: false} },
    { path: 'customers/:id', component: CustomerFormComponent, resolve: {title: 'Visualizar', customer: CustomerResolve, readonly: true} },
    { path: 'customers/:id/editar', component: CustomerFormComponent, resolve: {title: 'Editar', customer: CustomerResolve, readonly: false} },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}