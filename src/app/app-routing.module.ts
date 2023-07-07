import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/authguard/auth.guard.';

import { HomeComponent } from './component/home/home.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { ProductsComponent } from './component/products/products.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './component/access-denied/access-denied.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'menubar',
    component: MenubarComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },

      { path: 'products', component: ProductsComponent },
      { path: 'table', component: TableComponent },
      {
        path: 'formdesign',
        component: FormdesignComponent,
        canActivate: [AuthGuard],
      },

      {
        path: '**',
        component: AccessDeniedComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
