import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaImagenComponent } from './carga-imagen.component';

const routes: Routes = [{ path: '', component: CargaImagenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaImagenRoutingModule { }
