import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { NgxTypeaheadModule } from 'ngx-typeahead';

import { Solicitud2RoutingModule } from "./solicitud2-routing.module";
import { Solicitud2Component } from "./solicitud2.component";

import {
  SwiperModule
} from 'ngx-swiper-wrapper';


  const COMPONENTS = [Solicitud2Component];
  const COMPONENTS_DYNAMIC = [];
  
  @NgModule({
    imports: [
      SharedModule,
      Solicitud2RoutingModule,
      AutocompleteLibModule,
      NgxTypeaheadModule,
      SwiperModule,
    ],
    declarations: [
      ...COMPONENTS,
      ...COMPONENTS_DYNAMIC
    ],
    exports: [Solicitud2Component],
    entryComponents: COMPONENTS_DYNAMIC,
    providers: [],

  })
  export class Solicitud2Module {}
  

