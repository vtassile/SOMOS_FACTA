import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';


import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

import { SeteoService } from "@shared/services/seteo.service";
import { Seteo } from "@shared";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public seteo2: Seteo;
  public sliders: Array<any> = [];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  constructor(private seteoservice: SeteoService,private sanitizer: DomSanitizer)
  {
    this.seteoservice
      .get()
      .subscribe((carrusel: Seteo[]) => {
        this.seteo2 = carrusel[0];
        this.carga_todo();
      });
  }

  ngOnInit() {

  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
  public onIndexChange(index: number) {
    //  console.log('Swiper index: ', index);
  }

  carga_todo() {
    this.sliders.push(
      {
        imagePath: this.seteo2.imagen_3,
        label: 'Te Estamos Esperando',
        text:
          ' '
      },
      {
        imagePath: this.seteo2.imagen_4,
        label: 'Promocionando nuestras Carreras',
        text: ' '
      },
      {
        imagePath: this.seteo2.imagen_5,
        label: 'Bueno...nada',
        text:
          ' '
      },
      {
        imagePath: this.seteo2.imagen_6,
        label: 'Nuestro lugar en el Mundo',
        text:
          ' '
      }
    );
  }

  carga_todo2() {
    this.sliders.push(
      {
        imagePath: "",
        label: 'Te Estamos Esperando',
        text:
          ' '
      },
      {
        imagePath: "",
        label: 'Participando en Capacitaciones',
        text: ' '
      },
      {
        imagePath: "",
        label: 'Promocionando nuestras carreras',
        text:
          ' '
      },
      {
        imagePath: "",
        label: 'Bueno... nada',
        text:
          ' '
      }
    );
  }


}