import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { CargaImagenModule } from "../carga-imagen/carga-imagen.module";
import { ReservaRoutingModule } from "./reserva-routing.module";
import { ReservaComponent } from "./reserva.component";
import { Solicitud2Module } from "../solicitud2/solicitud2.module";
//import { TransfieroModule } from "../transfiero/transfiero.module";

const COMPONENTS = [ReservaComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ReservaRoutingModule,
    CargaImagenModule,    
    AutocompleteLibModule,
    ReservaRoutingModule,
    Solicitud2Module,
//    TransfieroModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ReservaModule {}
