import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { TransfieroRoutingModule } from './transfiero-routing.module';
import { TransfieroComponent } from './transfiero.component';

import { UserService } from "@shared/services/user.service";
import { MoneyService } from '@shared/services/money.service';
import { TMovService } from '@shared/services/tmov.service';

const COMPONENTS = [TransfieroComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    TransfieroRoutingModule,
    TransfieroComponent,    
    AutocompleteLibModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  exports: [TransfieroComponent],
  entryComponents: COMPONENTS_DYNAMIC,
 
})

export class TransfieroModule { }
