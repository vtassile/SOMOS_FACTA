import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarnetCarnetComponent } from './carnet/carnet.component';

const routes: Routes = [{ path: '', component: CarnetCarnetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarnetRoutingModule { }
