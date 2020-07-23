import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { CargaImagenModule } from "../carga-imagen/carga-imagen.module";

import { NMDiaRoutingModule} from './n-mdia-routing.module';
import { NMDiaComponent } from './n-mdia.component';

import { FileUploadModule } from "ng2-file-upload";

import{MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE,NativeDateAdapter, DateAdapter} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';

export const DateFormat = {
  parse: {
  dateInput: 'input',
  },
 display: {
 dateInput: 'DD/MM/YYYY',
 monthYearLabel: 'MMMM YYYY',
 dateA11yLabel: 'DD/MM/YYYY',
 monthYearA11yLabel: 'MMMM YYYY',
 }
 };

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
  entryComponents: COMPONENTS_DYNAMIC,
  providers:[
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: DateFormat }
  ]

})
export class NMDiaModule {}