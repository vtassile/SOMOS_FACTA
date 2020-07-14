import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import {
    SwiperModule, SwiperConfigInterface,
    SWIPER_CONFIG
} from 'ngx-swiper-wrapper';

import { TUsuarioRoutingModule } from './tusuario-routing.module';
import { NgxDataTableModule } from "angular-9-datatable";
import { TUsuarioComponent } from './tusuario.component';
import { DataFilterPipe } from './data-filter-pipe.pipe';

const COMPONENTS = [TUsuarioComponent];
const COMPONENTS_DYNAMIC = [];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
};

@NgModule({
    imports: [SharedModule, TUsuarioRoutingModule, SwiperModule, NgxDataTableModule],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, DataFilterPipe],
    entryComponents: COMPONENTS_DYNAMIC,
    providers: [{
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    }],
})

export class TUsuarioModule { }
