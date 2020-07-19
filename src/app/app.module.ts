import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { DefaultInterceptor } from '@core';
import {
  SwiperConfigInterface,
  SWIPER_CONFIG
} from 'ngx-swiper-wrapper';

import { StartupService } from '@core';
import { AuthService } from "angularx-social-login";

import { SesionService } from "@shared/services/sesion.service";
import { UserService } from "@shared/services/user.service";
import { RolService } from "@shared/services/rol.service";
import { UserClasService } from "@shared/services/clasuser.service";
import { TMenuService } from "@shared/services/tmenu.service";
import { SeteoService } from "@shared/services/seteo.service";
import { MDiaService } from '@shared/services/mdia.service';
import { ReservaService } from '@shared/services/reserva.service';
import { TMovService } from '@shared/services/tmov.service';
import { ExcelService } from "@shared/services/excel.service";
import { MoneyService } from '@shared/services/money.service';

import { AuthGuard } from '@shared';
import { GOOGLE, FACEBOOK } from "@shared";

let config = new AuthServiceConfig([GOOGLE, FACEBOOK]);

export function provideConfig() {
  return config;
}

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  slidesPerView: 1,
  spaceBetween: 30,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
};

const COMPONENTES_SERVICIOS = [AuthGuard, UserService, SesionService, AuthService,
  RolService, UserClasService, TMenuService, SeteoService,
  MDiaService, ReservaService, TMovService, ExcelService, MoneyService];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    RoutesModule,
    FormlyModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    SocialLoginModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    }, 
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },  
    ...COMPONENTES_SERVICIOS,

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
