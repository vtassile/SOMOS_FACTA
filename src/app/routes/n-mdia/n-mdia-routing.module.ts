import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NMDiaComponent } from './n-mdia.component';

const routes: Routes = [
    {path: '',component: NMDiaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NMDiaRoutingModule {}
