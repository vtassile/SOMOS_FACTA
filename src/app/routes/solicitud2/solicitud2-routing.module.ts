import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Solicitud2Component } from './solicitud2.component';

const routes: Routes = [
    {path: '',component: Solicitud2Component}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Solicitud2RoutingModule {}
