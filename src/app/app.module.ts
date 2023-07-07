import { NgModule } from '@angular/core';
import { MaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { PopupComponent } from './component/popup/popup.component';
import { ProductsComponent } from './component/products/products.component';
import { AccessDeniedComponent } from './component/access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';

import { PriceFormatPipe } from './component/table/pipes/price-format.pipe';

import { AuthGuard } from './guard/authguard/auth.guard.';
import { AuthService } from './service/authservice/auth.service';

@NgModule({
  declarations: [
    AppComponent,

    MenubarComponent,
    HomeComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    ProductsComponent,
    LoginComponent,
    AccessDeniedComponent,

    PriceFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [PriceFormatPipe, AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
