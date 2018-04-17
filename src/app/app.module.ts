import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { AppRoutingModule } from './app.routing';
import { CustomerFormComponent } from './customer/customer-form.component';
import { CustomerService } from './customer/customer-service';
import { CustomerResolve } from './customer/customer-resolve';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PaginationModule.forRoot(),
    TextMaskModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CustomerService, CustomerResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
