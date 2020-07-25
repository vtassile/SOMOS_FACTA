import { Component, Output, EventEmitter, OnInit, ViewChild, Input,OnChanges, SimpleChange } from "@angular/core";
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

export class Solicitud2Component implements OnChanges, OnInit {


  @Input('usuario') usuario: any;
  @Input('detecta') detecta: any;

  @Output()
  propaga_todo = new EventEmitter<string>();

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

  public m_inicial: String[] = ["", "", "", "", "", "", ""];

  public identity;  // identidad del agente
  public token;  // token valido del agente
  public rol;   // rol del agente
  
  public fecha_servidor;   /// fecha de servidor
  public prefiere;  // preferencia de menu del agente
  public cuenta;   // cuenta monetaria del agente
  public cantidad = 1;  // cantidad de viandas
  public importe;   // costo del menu para el agente
  public cantidad00 = 1;  // cantidad de viandas
  public importe00;   // costo del menu para el agente

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
      this.importe00 = this.importe;
      this.prefiere = this.identity.tmenu._id;
    }
    this.seteoservice.get().subscribe((data2: Seteo[]) => {
      this.seteo = data2;
      this.m_viandas = this.seteo[0].m_viandas;
      this._sesionService.fecha_servidor().subscribe((data) => {
        this.fecha_servidor = data;
        this.i_dia = this._sesionService.n_semana(this.fecha_servidor);
        this.i_sem = this._sesionService.cambia_fecha(this.fecha_servidor, -(this.i_dia));
        this.f_sem = this._sesionService.cambia_fecha(this.fecha_servidor, 6 - this.i_dia);
        this.tmenuservice.get().subscribe((data2: TMenu[]) => {
          this.tmenus = data2;

          this.mdiaservice.get().subscribe((data3: MDia[]) => {
            this.mdias = data3.filter(e => e.f_fecha >= this.i_sem && e.f_fecha <= this.f_sem);
            // this.mdias = data3;
            this.reservaservice
              .get_filtro(this.usuario._id)
              .subscribe((data4: Reserva[]) => {
                this.reservas = data4.filter(e => e.f_fecha >= this.i_sem && e.f_fecha <= this.f_sem)   
                   //    this.reservas=data4;
                this._userService
                  .c_reserva(
                    this.fecha_servidor,
                    this.fecha_servidor,
                    this.seteo[0].l_abono
                  )
                  .subscribe((data5) => {
                    this.posible = data5;
                    this.moneyservice
                      .get_filtro(this.usuario._id)
                      .subscribe((data2: Money[]) => {
                        this.money = data2;
                         this.obt_saldo(this.usuario._id);
                        this.tmovservice.get().subscribe((data2: TMov[]) => {
                          this.tmovs = data2;
                          this.maqueta = this.maqueta_fecha(this.maqueta);
                          this.permite = true;
                
                        });
                      });
                  });
              });
          });

        });
      });
    });
  }  // fin de ngonInit

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.obt_m1 = [["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"],
    ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"],
    ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"]];
  
    this.obt_m2 = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
    ["", ""], ["", ""]];
  
    this.obt_m3 = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
    ["", ""], ["", ""]];
  
    this.m_inicial = ["", "", "", "", "", "", ""];

    this.seteoservice.get().subscribe((data2: Seteo[]) => {
      this.seteo = data2;
      this.m_viandas = this.seteo[0].m_viandas;
      this._sesionService.fecha_servidor().subscribe((data) => {
        this.fecha_servidor = data;
        this.i_dia = this._sesionService.n_semana(this.fecha_servidor);
        this.i_sem = this._sesionService.cambia_fecha(this.fecha_servidor, -(this.i_dia));
        this.f_sem = this._sesionService.cambia_fecha(this.fecha_servidor, 6 - this.i_dia);
        this.tmenuservice.get().subscribe((data2: TMenu[]) => {
          this.tmenus = data2;

          this.mdiaservice.get().subscribe((data3: MDia[]) => {
            this.mdias = data3.filter(e => e.f_fecha >= this.i_sem && e.f_fecha <= this.f_sem);
            // this.mdias = data3;
            this.reservaservice
              .get_filtro(this.usuario._id)
              .subscribe((data4: Reserva[]) => {
                this.reservas = data4.filter(e => e.f_fecha >= this.i_sem && e.f_fecha <= this.f_sem)   
                   //    this.reservas=data4;
                this._userService
                  .c_reserva(
                    this.fecha_servidor,
                    this.fecha_servidor,
                    this.seteo[0].l_abono
                  )
                  .subscribe((data5) => {
                    this.posible = data5;
                    this.moneyservice
                      .get_filtro(this.usuario._id)
                      .subscribe((data2: Money[]) => {
                        this.money = data2;
                         this.obt_saldo(this.usuario._id);
                        this.tmovservice.get().subscribe((data2: TMov[]) => {
                          this.tmovs = data2;
                          this.maqueta = this.maqueta_fecha(this.maqueta);
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

    


  }


  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public onIndexChange(index: number) {
    //  console.log('Swiper index: ', index);
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

          if (this.puedo_pedir(i)) {
            // HAY MENU Y SE PUEDE PEDIR
            this.maqueta[i][1] = "2";
            this.maqueta[i][2] = menu_dia[0].s_detmenu;
            if (menu_dia[0].s_imagen) {
              this.maqueta[i][3] = menu_dia[0].s_imagen;
            }
            this.maqueta[i][4] = "Solicita tu Vianda";
            this.m_inicial[i] = menu_dia[0].tmenu["s_detalle"] + "-" + menu_dia[0].s_detmenu;

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
    return maqueta;
  }

  puedo_pedir(indice) {
    var retorna = true;
    if (this.rol < 3) {
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
    var seleccion = this.m_inicial[indice_ff1];
    if (seleccion == "Otro-Sin Menú") {
      alert("No Existe Menú en la Opción Elegida");
      return;
    } else {
      var indicador = 0;
      this.maqueta[indice_ff1][1] = "4";
      this.maqueta[indice_ff1][4] = "Pasa a Retirar tu vianda";
      var largo_i = this.obt_m1[indice_ff1].length;
      for (let v = 0; v < largo_i; v++) {
        if (seleccion == this.obt_m1[indice_ff1][v]) { indicador = v }
      }
      if (seleccion == "") { indicador = 1 }
      this.maqueta[indice_ff1][2] = this.obt_m1[indice_ff1][indicador];
      var _idmenu = this.obt_m2[indice_ff1][indicador];
      // luego cambiar cantidad para hacerlo mas dinamico
      if (this.cuenta && this.puedo_pedir(indice_ff1)) {
        //  this.PlaySound(3);
        var c_limite = this.cuenta.Saldo - this.importe;
        if (c_limite < this.seteo[0].m_saldo) {
          //   this.notifier.notify("warning", "Te excediste de tu limite");
        } else {
          var datos90 = {
            usuario: this.usuario._id,
            f_fecha:  this._sesionService.fecha_inv_formateada(this.maqueta[indice_ff1][0]),
            n_menu: _idmenu,
            n_cantidad: this.cantidad00,
            tmov: this.tmovs[0]._id,
            importe: this.importe00,
            pagado: "Si",
            consumido: "No",
          };
          this.reservaservice.add(datos90).subscribe((res) => {
            this.reservaservice
              .get_filtro(this.usuario._id)
              .subscribe((data2: Reserva[]) => {
                this.reservas = data2;
                this.paga_vianda(this.maqueta[indice_ff1][0]);
              });
        });
        }
      } else {
        // if (!this.cuenta)
        // this.notifier.notify("warning", "Cargá dinero en tu cuenta");
      }
    }
  }

  paga_vianda(dia_x) {
    var dia = dia_x.substr(0, 2);
    var mes = dia_x.substr(3, 2);
    var datos00 = {
      usuario: this.usuario._id,
      f_fecha: this.fecha_servidor,
      tmov: this.tmovs[1]._id,
      detalle: "Vianda del " + dia + "/" + mes,
      importe_d: 0,
      importe_h: Number(this.importe00),
    };
    this.moneyservice.add(datos00).subscribe((res) => {
      this.moneyservice
        .get_filtro(this.usuario._id)
        .subscribe((data2: Money[]) => {
          this.money = data2;
          this.obt_saldo(this.usuario._id);
          this.propaga_todo.emit("solicita");
        });
    });
  }


}