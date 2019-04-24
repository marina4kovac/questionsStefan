import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StefanComponent } from './stefan/stefan.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
 {path:'stefan', component:StefanComponent},
 {path:'admin', component:AdminComponent},
 {path:'', pathMatch:"full", redirectTo:"stefan"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
