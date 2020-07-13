import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConfiguraRoutingModule } from './configura-routing.module';
import { ConfiguraConfiguraComponent } from './configura.component';
import {NgxDataTableModule} from "angular-9-datatable";

import {CargaImagenModule} from "../carga-imagen/carga-imagen.module";

const COMPONENTS = [ConfiguraConfiguraComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ConfiguraRoutingModule,
    NgxDataTableModule,
    CargaImagenModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ConfiguraModule { }
