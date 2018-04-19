import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { CustomerFormComponent } from './customer/customer-form.component';
import { CustomerService } from './customer/customer-service';

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
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
