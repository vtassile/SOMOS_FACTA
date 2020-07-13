import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CargaImagenRoutingModule } from './carga-imagen-routing.module';
import { CargaImagenComponent } from './carga-imagen.component';
import {NgxDataTableModule} from "angular-9-datatable";

import { FileUploadModule } from "ng2-file-upload";

const COMPONENTS = [CargaImagenComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    CargaImagenRoutingModule,
    NgxDataTableModule,
    FileUploadModule,
  ],
  exports:[CargaImagenComponent],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class CargaImagenModule { }
