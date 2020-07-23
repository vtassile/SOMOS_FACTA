import { Component, Output, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { UserService } from "@shared/services/user.service";
import { MDiaService } from "@shared/services/mdia.service";
import { TMenuService } from "@shared/services/tmenu.service";
import { TMovService } from "@shared/services/tmov.service";
import { ReservaService } from "@shared/services/reserva.service";
import { SeteoService } from "@shared/services/seteo.service";
import { MoneyService } from "@shared/services/money.service";
import { SesionService } from "@shared/services/sesion.service";

import { User } from "@shared";
import { MDia } from "@shared";
import { TMenu } from "@shared";
import { TMov } from "@shared";
import { Reserva } from "@shared";
import { Seteo } from "@shared";
import { Money } from "@shared";
import { Maqueta } from "@shared";

import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: "app-solicitud2",
  templateUrl: "./solicitud2.component.html",
  styleUrls: ["./solicitud2.component.scss"]
})

export class Solicitud2Component implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  public config: SwiperConfigInterface = {
    effect: 'flip',
    grabCursor: true,
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    },
    loop: false,
    slidesPerView: 3,
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

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  public dia_sem: number[] = [1, 2, 3, 4, 5, 6, 7];
  public maqueta: String[][] = [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""]]

  public obt_m1: String[][] = [["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"],
  ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"],
  ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"]];

  public obt_m2: String[][] = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
  ["", ""], ["", ""]];

  public obt_m3: String[][] = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
  ["", ""], ["", ""]];

  public m_inicial: String[] = ["","","","","","",""];

  public identity;  // identidad del agente
  public token;  // token valido del agente
  public rol;   // rol del agente

  public fecha_servidor;   /// fecha de servidor
  public importe;   // costo del menu para el agente
  public prefiere;  // preferencia de menu del agente
  public cantidad = 1;  // cantidad de viandas
  public cuenta;   // cuenta monetaria del agente

  public seteo: Seteo[];
  public tmenus: TMenu[];
  public mdias: MDia[];
  public reservas: Reserva[];
  public money: Money[];
  public tmovs: TMov[];

  public m_viandas; // nro de viandas maximo
  public posible; // limite de tiempo para pagar en la fecha y hora actual
  public i_dia;   // indice del dia de semana actual
  public i_sem;  // fecha de inicio de semana
  public f_sem;  // fecha de termino de semana
  public food; // comida seleccionada
  
  public permite = false;  // habilita mostrar las tarjetas

  public valor_inicial="Menú Tradicional-Pollo";

  constructor(
    public router: Router,
    private sanitizer: DomSanitizer,
    private mdiaservice: MDiaService,
    private tmenuservice: TMenuService,
    private tmovservice: TMovService,
    private reservaservice: ReservaService,
    private _userService: UserService,
    private seteoservice: SeteoService,
    private moneyservice: MoneyService,
    private _sesionService: SesionService,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();

      this.importe = this.identity.clase.importe;
      this.prefiere = this.identity.tmenu._id;
      console.log("rol");
      console.log(this.rol);
    }

    this.seteoservice.get().subscribe((data2: Seteo[]) => {
      this.seteo = data2;
      this.m_viandas = this.seteo[0].m_viandas;
      this._sesionService.fecha_servidor().subscribe((data) => {
        this.fecha_servidor = data;
        this.i_dia = this._sesionService.n_semana(this.fecha_servidor);
        this.i_sem = this._sesionService.cambia_fecha(this.fecha_servidor, -(this.i_dia));
        this.f_sem = this._sesionService.cambia_fecha(this.fecha_servidor, 6 - this.i_dia);
        //    this.i_sem = "2020-03-20";
        //    this.f_sem = "2020-03-26";

        this.tmenuservice.get().subscribe((data2: TMenu[]) => {
          this.tmenus = data2;
          //      console.log("this.tmenus");
          //    console.log(this.tmenus);
          this.mdiaservice.get().subscribe((data3: MDia[]) => {
            this.mdias = data3.filter(e => e.f_fecha >= this.i_sem && e.f_fecha <= this.f_sem);
            // this.mdias = data3;
            this.reservaservice
              .get_filtro(this.identity._id)
              .subscribe((data4: Reserva[]) => {
                this.reservas = data4.filter(e => e.f_fecha >= this.i_sem && e.f_fecha <= this.f_sem);
                this._userService
                  .c_reserva(
                    this.fecha_servidor,
                    this.fecha_servidor,
                    this.seteo[0].l_abono
                  )
                  .subscribe((data5) => {
                    this.posible = data5;
                    this.moneyservice
                      .get_filtro(this.identity._id)
                      .subscribe((data2: Money[]) => {
                        this.money = data2;
                        //                    console.log("this.money");
                        //                  console.log(this.money);
                        this.obt_saldo(this.identity._id);
                        this.tmovservice.get().subscribe((data2: TMov[]) => {
                          this.tmovs = data2;
                          //                  console.log("this.tmovs");
                          //                console.log(this.tmovs);

                          // esta bandera va luego que las maquetas se arma;
                          this.maqueta = this.maqueta_fecha(this.maqueta);
                          console.log(this.maqueta);
                          this.permite = true;
                          //                      this.arma_maquetas();
                        });
                      });
                  });
              });
          });
        });
      });
    });
  }  // fin de ngonInit

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  public onIndexChange(index: number) {
    console.log('Swiper index: ', index);
  }

  public consulta() { }

  obt_saldo(comensal): any {
    this.moneyservice.get_saldo(comensal).subscribe((data2) => {
      this.cuenta = data2[0];
    });
  }

  callType(indice_ff1, seleccion) {
    var indicador = 0;
    var largo_i = this.obt_m1[indice_ff1].length;
    for (let v = 0; v < largo_i; v++) {
      if (seleccion == this.obt_m1[indice_ff1][v]) { indicador = v }
    }
    if (seleccion == "") { indicador = 1 }
    this.maqueta[indice_ff1][3] = this.obt_m3[indice_ff1][indicador]
  }

  public maqueta_fecha(maqueta): any {
    var dia = this.i_sem;
    //var dia = "2020-03-20";
    for (let i = 0; i < 7; i++) {
      this.maqueta[i][0] = this._sesionService.fecha_formateada(dia);
      this.maqueta[i][7] = this._sesionService.d_semana(dia);
      var reservas_dia = this.reservas.filter(e => e.f_fecha == dia);
      if (reservas_dia.length > 0) {
        if (!(reservas_dia[0].n_menu["s_imagen"])) {
          this.maqueta[i][3] = "assets/images/sin_imagen.jpg";
        }
        if (reservas_dia[0].consumido = "No") {
          // SE RESERVO Y NO SE CONSUMIO
          this.maqueta[i][1] = "4";
          this.maqueta[i][2] = reservas_dia[0].n_menu["s_detmenu"];
          if (reservas_dia[0].n_menu["s_imagen"])
            this.maqueta[i][3] = reservas_dia[0].n_menu["s_imagen"];
          this.maqueta[i][4] = "Pasa a Retirar tu Vianda";
        } else {
          // SE RESERVO Y SE CONSUMIO
          this.maqueta[i][1] = "5";
          this.maqueta[i][2] = reservas_dia[0].n_menu["s_detmenu"];
          if (reservas_dia[0].n_menu["s_imagen"])
            this.maqueta[i][3] = reservas_dia[0].n_menu["s_imagen"];
          this.maqueta[i][4] = "Ya Retiraste tu Vianda";
        }
      }
      else {
        var menu_dia = this.mdias.filter(e => e.f_fecha == dia);
        if (menu_dia.length > 0) {
          if (!menu_dia[0].s_imagen) {
            this.maqueta[i][3] = "assets/images/sin_imagen.jpg";
          }
          console.log("puedo pedir");
          console.log(this.puedo_pedir(i));
          if (this.puedo_pedir(i)) {
            // HAY MENU Y SE PUEDE PEDIR
            this.maqueta[i][1] = "2";
            this.maqueta[i][2] = menu_dia[0].s_detmenu;
            if (menu_dia[0].s_imagen) {
              this.maqueta[i][3] = menu_dia[0].s_imagen;
            }
            this.maqueta[i][4] = "Solicita tu Vianda";
            this.m_inicial[i]=menu_dia[0].tmenu["s_detalle"]+ "-" + menu_dia[0].s_detmenu;
            console.log("Menu Inicial");
            console.log(this.m_inicial[i]);
            for (let ii = 0; ii < menu_dia.length; ii++) {
              this.obt_m1[i][ii] = menu_dia[ii].tmenu["s_detalle"];
              this.obt_m1[i][ii] = this.obt_m1[i][ii] + "-" + menu_dia[ii].s_detmenu;
              this.obt_m2[i][ii] = menu_dia[ii]._id;
              this.obt_m3[i][ii] = menu_dia[ii].s_imagen;
            }

          } else {
            // HAY MENU PERO NO SE PUEDE PEDIR      
            this.maqueta[i][1] = "3";
            this.maqueta[i][2] = menu_dia[0].s_detmenu;
            if (menu_dia[0].s_imagen) {
              this.maqueta[i][3] = menu_dia[0].s_imagen;
            }
            this.maqueta[i][4] = "Te lo Perdiste";

          }
        } else {
          // NO HAY MENU
          this.maqueta[i][1] = "1";
          this.maqueta[i][2] = "No Tenemos Menú";
          this.maqueta[i][3] = "assets/images/plato_vacio.jpg";
          this.maqueta[i][4] = "";

        }

      }
      dia = this._sesionService.cambia_fecha(dia, 1);
    }
    console.log(this.maqueta);
    return maqueta;
  }

  puedo_pedir(indice) {
    var retorna = true;
    if(this.rol<3){
      if (this.i_dia == indice) {
        if (this.posible.minutos_t > 0) {
          retorna = true;
        } else { retorna = false; }
      }
      if (this.i_dia < indice) { retorna = true }
      if (this.i_dia > indice) { retorna = false }
    }
    return retorna;
  }

  paga(indice_ff1) {
    console.log(indice_ff1);
    console.log(this.m_inicial[indice_ff1]);

  }




















}