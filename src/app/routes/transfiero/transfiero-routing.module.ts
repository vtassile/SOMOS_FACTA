
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransfieroComponent } from './transfiero.component';

const routes: Routes = [
    {
        path: '',
        component: TransfieroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransfieroRoutingModule {}



