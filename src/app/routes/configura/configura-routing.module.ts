import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguraConfiguraComponent } from './configura.component';

const routes: Routes = [{ path: '', component: ConfiguraConfiguraComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguraRoutingModule { }
