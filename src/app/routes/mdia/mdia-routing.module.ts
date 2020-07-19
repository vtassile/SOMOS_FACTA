import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MDiaComponent } from './mdia.component';


const routes: Routes = [
    { path: '', component: MDiaComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MDiaRoutingModule {
}
