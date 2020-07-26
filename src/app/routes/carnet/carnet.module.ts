import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CarnetRoutingModule } from './carnet-routing.module';
import { CarnetCarnetComponent } from './carnet/carnet.component';
import { QRCodeModule } from 'angularx-qrcode';

const COMPONENTS = [CarnetCarnetComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    CarnetRoutingModule,
    QRCodeModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class CarnetModule { }
