import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MusuarioRoutingModule } from './musuario-routing.module';
import { MusuarioAbcComponent } from './abc/abc.component';
import { CargaImagenModule } from "../carga-imagen/carga-imagen.module";

const COMPONENTS = [MusuarioAbcComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    MusuarioRoutingModule,
    CargaImagenModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class MusuarioModule { }
