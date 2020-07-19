import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { CargaImagenModule } from "../carga-imagen/carga-imagen.module";
import { MDiaRoutingModule } from './mdia-routing.module';

import { MDiaComponent } from './mdia.component';

const COMPONENTS = [MDiaComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    MDiaRoutingModule,
    CargaImagenModule,    
    AutocompleteLibModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class MDiaModule {}
