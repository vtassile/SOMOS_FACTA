import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { CargaImagenModule } from "../carga-imagen/carga-imagen.module";

import { NMDiaRoutingModule} from './n-mdia-routing.module';
import { NMDiaComponent } from './n-mdia.component';

import { FileUploadModule } from "ng2-file-upload";

const COMPONENTS = [NMDiaComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    NMDiaRoutingModule,
    CargaImagenModule,    
    AutocompleteLibModule,
    FileUploadModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class NMDiaModule {}