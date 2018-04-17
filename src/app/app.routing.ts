import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerFormComponent } from './customer/customer-form.component';
import { CustomerResolve } from './customer/customer-resolve';

const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    { path: 'customers', component: CustomerListComponent },
    { path: 'customers/cadastrar', component: CustomerFormComponent, data: { title: 'Cadastrar', readonly: false } },
    { path: 'customers/:id', component: CustomerFormComponent, data: { title: 'Visualizar', readonly: true }, resolve: { customer: CustomerResolve } },
    { path: 'customers/:id/editar', component: CustomerFormComponent, data: { title: 'Editar', readonly: false }, resolve: { customer: CustomerResolve } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}