import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusuarioAbcComponent } from './abc/abc.component';

const routes: Routes = [{ path: 'abc/:id', component: MusuarioAbcComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusuarioRoutingModule { }
