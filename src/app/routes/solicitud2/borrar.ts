

import { Component, Output, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

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
    loop:false,
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

  estado_gral = 0;
  public identity;
  public token;
  public rol;
  
  public importe;
  public m_viandas;
  public saldo;
  public posible;
  public opcion;
  public prefiere;
  abona_p: number = 1;
  reserva_p: number = 1;
  public fecha_servidor;
  public fecha_solicitud;
  agente: any = {};
  cuenta: any = {};
  angForm_2: FormGroup;
  tmenus: TMenu[];
  mdias: MDia[];
  mdias_f: MDia[];
  mdias_f3: MDia[];
  tmovs: TMov[];
  reservas: Reserva[];
  reservas_f: Reserva[];
  seteo: Seteo[];
  money: Money[];
  permite: boolean = false;
  permite2: boolean = false;
  dia_semana: string = "";
  public query3;
  usuarios: string[] = [];
  u_id: string[] = [];
  u_nombre: string[] = [];
  u_apellido: string[] = [];
  public importe00;
  public cantidad00;
  public dia_sem: number[] = [1, 2, 3, 4, 5, 6, 7];
  public maqueta: String[][] = [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""]]

  public obt_m1: String[][] = [["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"],
  ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"],
  ["Otro-Sin Menú", "Otro-Sin Menú"], ["Otro-Sin Menú", "Otro-Sin Menú"]];

  public obt_m2: String[][] = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
  ["", ""], ["", ""]];

  public obt_m3: String[][] = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
  ["", ""], ["", ""]];


  public id_elegida = "";

  public obt_n: number[] = [0, 0, 0, 0, 0, 0, 0];
  public fecha_s: String[] = ["", "", "", "", "", "", ""];


  constructor(
    public router: Router,
    private mdiaservice: MDiaService,
    private tmenuservice: TMenuService,
    private tmovservice: TMovService,
    private reservaservice: ReservaService,
    private _userService: UserService,
    private seteoservice: SeteoService,
    private moneyservice: MoneyService,
    private _sesionService: SesionService,
    private fb: FormBuilder,
    
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();
    }


    this.importe = this.identity.clase.importe;
    this.prefiere = this.identity.tmenu._id;
    this.query3 = this.identity.s_username;
    this.importe00 = this.identity.clase.importe;
    this.cantidad00 = 1;
    this.angForm_2 = this.fb.group({
      fecha_solicitud: "",
      tmenu: "",
      importe_solicitud: 0,
      cantidad_viandas: 0,
      codi_menu: ""
    });

    this.seteoservice.get().subscribe((data2: Seteo[]) => {
      this.seteo = data2;
      this.m_viandas = this.seteo[0].m_viandas;
      this._sesionService.fecha_servidor().subscribe((data) => {
        this.fecha_servidor = data;
        this.fecha_solicitud = data;
        this.tmenuservice.get().subscribe((data2: TMenu[]) => {
          this.tmenus = data2;
          this.permite = true;
          this.angForm_2 = this.fb.group({
            fecha_solicitud: this.fecha_solicitud,
            tmenu: this.prefiere,
            importe_solicitud: this.importe,
            cantidad_viandas: 1,
            codi_menu: ""
          });
          this.d_semana();
          this.mdiaservice.get().subscribe((data3: MDia[]) => {
            this.mdias = data3;
            this.reservaservice
              .get_filtro(this.identity._id)
              .subscribe((data4: Reserva[]) => {
                this.reservas = data4;
                // poner tmenu por default y si no se reservo menu, no dejar reservar otro menu y advertir
                this.mdias_f = this.obt_menu(
                  this.angForm_2.value.fecha_solicitud,
                  this.angForm_2.value.tmenu
                );
                this.mdias_f3 = this.obt_menu_3(
                  this.angForm_2.value.fecha_solicitud
                );
                this.reservas_f = this.obt_reserva(
                  this.angForm_2.value.fecha_solicitud
                );
                this._userService
                  .c_reserva(
                    this.fecha_servidor,
                    this.fecha_servidor,
                    this.seteo[0].l_abono
                  )
                  .subscribe((data5) => {
                    this.posible = data5;
                    this.permite2 = true;
                    this.moneyservice
                      .get_filtro(this.identity._id)
                      .subscribe((data2: Money[]) => {
                        this.money = data2;
                        this.obt_saldo(this.identity._id);
                        this.tmovservice.get().subscribe((data2: TMov[]) => {
                          this.tmovs = data2;
                          this.arma_maquetas();
                        });
                      });
                  });
              });
          });
        });
      });
    });
  }  // fin de ngonInit


  public onIndexChange(index: number) {
      console.log('Swiper index: ', index);
  }

  arma_maquetas() {
    var desplaza = 0;
    if (this.dia_semana == "Domingo") {
      desplaza = 1;
    }
    if (this.dia_semana == "Lunes") {
      desplaza = -1;
    }
    if (this.dia_semana == "Martes") {
      desplaza = -2;
    }
    if (this.dia_semana == "Miercoles") {
      desplaza = -3;
    }
    if (this.dia_semana == "Jueves") {
      desplaza = -4;
    }
    if (this.dia_semana == "Viernes") {
      desplaza = -5;
    }
    if (this.dia_semana == "Sabado") {
      desplaza = -6;
    }
    this.cambia_d(desplaza);
    for (let i = 0; i < 7; i++) {
      this.fecha_s[i] = this.angForm_2.value.fecha_solicitud;
      this.maqueta[i][0] = this.fecha_formateada();
      var estadoo = this.calcula_estado();
      this.maqueta[i][1] = estadoo.toString();
      this.maqueta[i][7] = this.dia_semana;
      if (this.maqueta[i][1] == "1") {           //  Maqueta tipo 1
        this.maqueta[i][2] = "No Tenemos Menú";
        this.maqueta[i][3] = "assets/images/reservado.png";
        this.maqueta[i][4] = "No existe Opciones Cargadas";
      }
      if (this.maqueta[i][1] == "2") {        //  Maqueta tipo 2
        this.obt_n[i] = this.mdias_f3.length;
        for (let ii = 0; ii < this.obt_n[i]; ii++) {
          this.obt_m1[i][ii] = this.mdias_f3[ii].tmenu["s_detalle"];
          this.obt_m1[i][ii] = this.obt_m1[i][ii] + "-" + this.mdias_f3[ii].s_detmenu;
          this.obt_m2[i][ii] = this.mdias_f3[ii]._id;
          this.obt_m3[i][ii] = this.mdias_f3[ii].s_imagen;
        }
        this.maqueta[i][2] = "";
        this.maqueta[i][3] = this.mdias_f3[0].s_imagen;
        var sale_texto = "Límite para Abonar: ";
        if (this.posible.f_dias > 0) {
          sale_texto = sale_texto + this.posible.f_dias + " dias ";
        }
        if (this.posible.f_horas > 0) {
          sale_texto = sale_texto + this.posible.f_horas + " horas ";
        }
        if (this.posible.f_minutos > 0) {
          sale_texto = sale_texto + this.posible.f_horas + " minutos";
        }
        this.maqueta[i][4] = sale_texto;
      }
      if (this.maqueta[i][1] == "3") {    //  Maqueta tipo 3
        this.maqueta[i][2] = "";
        this.maqueta[i][3] = this.mdias_f3[0].s_imagen;
        this.maqueta[i][4] = "Te lo Perdiste";
    //    console.log("El menu es");
    //    console.log(this.mdias_f3);
      }
      if (this.maqueta[i][1] == "4") {     //  Maqueta tipo 4
        this.maqueta[i][2] = this.reservas_f[0].n_menu["s_detmenu"];
        this.maqueta[i][3] = "assets/images/pagado.png";
        this.maqueta[i][4] = "Pasa a Retirar tu vianda";
        this.maqueta[i][5] = String(this.reservas_f[0].n_cantidad);
        this.maqueta[i][6] = String(this.reservas_f[0].importe);
      }
      if (this.maqueta[i][1] == "5") {    //  Maqueta tipo 5
        this.maqueta[i][2] = this.reservas_f[0].n_menu["s_detmenu"];
        this.maqueta[i][3] = "assets/images/consumido2.jpg";
        this.maqueta[i][4] = "Consumiste tu vianda";
        this.maqueta[i][5] = String(this.reservas_f[0].n_cantidad);
        this.maqueta[i][6] = String(this.reservas_f[0].importe);
      }
      this.cambia_d(1);
    }
    var desplaza2 = -desplaza - 7;
    this.cambia_d(desplaza2);
  }

  consulta(){
    console.log(this.maqueta);
  }
  cambia_f() {
    this.mdias_f = this.obt_menu(
      this.angForm_2.value.fecha_solicitud,
      this.angForm_2.value.tmenu
    );
    this.mdias_f3 = this.obt_menu_3(
      this.angForm_2.value.fecha_solicitud
    );

    this.reservas_f = this.obt_reserva(this.angForm_2.value.fecha_solicitud);
    this.cambia_f2(this.fecha_servidor,
      this.angForm_2.value.fecha_solicitud,
      this.seteo[0].l_abono);
  }

  cambia_f2(actual, pedido, retraso) {

    var dia1 = pedido.substr(8, 2);
    var mes1 = pedido.substr(5, 2);
    var anyo1 = pedido.substr(0, 4);
    var dia2 = actual.substr(8, 2);
    var mes2 = actual.substr(5, 2);
    var anyo2 = actual.substr(0, 4);
    var nuevapedido = new Date(anyo1 + "," + mes1 + "," + dia1);
    var nuevaactual = new Date(anyo2 + "," + mes2 + "," + dia2);
    var Dif = nuevapedido.getTime() - nuevaactual.getTime();
    var minutos = Math.trunc(Dif / (1000 * 60));
    var minuto_a = new Date().getMinutes();
    var hora_a = new Date().getHours();
    var min_a = hora_a * 60 + minuto_a;
    var minutos_t = minutos - min_a + retraso * 60;
    var f_dias = Math.trunc(minutos_t / (60 * 24));
    var e_dias = minutos_t / (60 * 24);
    // diferencia entre dias expresada en dias
    var d_dias = e_dias - f_dias;
    // diferencia entre dias expresada en minutos
    var d_dias2 = (e_dias - f_dias) * 60 * 24;
    var f_horas = Math.trunc(d_dias2 / 60);
    var e_horas = d_dias2 / 60;
    // diferencia entre dias expresada en horas
    var d_horas = e_horas - f_horas;
    // diferencia entre dias expresada en minutos
    var f_minutos = Math.trunc((e_horas - f_horas) * 60);
    var datos = {
      minutos_t: minutos_t,
      f_dias: f_dias,
      f_horas: f_horas,
      f_minutos: f_minutos
    };
    this.posible = datos;
    return;
  }

  obt_menu(ffecha, tmenu2): MDia[] {
    return this.mdias.filter(function (v, i) {
      return v["f_fecha"] == ffecha && v["tmenu"]["_id"] == tmenu2;
    });
  }

  obt_menu_3(ffecha): MDia[] {
    return this.mdias.filter(function (v, i) {
      return v["f_fecha"] == ffecha;
    });
  }

  obt_reserva(ffecha): Reserva[] {
    return this.reservas.filter(function (v, i) {
      return v["f_fecha"] == ffecha;
    });
  }

  obt_saldo(comensal) {
    return this.moneyservice.get_saldo(comensal).subscribe((data2) => {
      this.cuenta = data2[0];
    });
  }

  paga(indice_ff1) {
    var seleccion = this.angForm_2.value.codi_menu;
      if (seleccion == "Otro-Sin Menú") {
        alert("No Existe Menú en la Opctión Elegida");
        return;
      } else {
        var indicador = 0;
        this.maqueta[indice_ff1][1] = "4";
        this.maqueta[indice_ff1][4] = "Pasa a Retirar tu vianda";
    //    console.log("Esta es la seleccion");
    //    console.log(seleccion);

        var largo_i = this.obt_m1[indice_ff1].length;

        for (let v = 0; v < largo_i; v++) {
          if (seleccion == this.obt_m1[indice_ff1][v]) { indicador = v }
        }
        if (seleccion == "") {indicador=1}
        this.maqueta[indice_ff1][2] =  this.obt_m1[indice_ff1][indicador];

        var _idmenu = this.obt_m2[indice_ff1][indicador];
        // luego cambiar cantidad para hacerlo mas dinamico
        if (this.cuenta && this.abona_p) {
    //      this.PlaySound(3);
          var c_limite = this.cuenta.Saldo - this.importe;
          if (c_limite < this.seteo[0].m_saldo) {
  //          this.notifier.notify("warning", "Te excediste de tu limite");
          } else {
            var datos90 = {
              usuario: this.identity._id,
              f_fecha: this.fecha_s[indice_ff1],
              n_menu: _idmenu,
              n_cantidad: this.cantidad00,
              tmov: this.tmovs[0]._id,
              importe: this.importe00,
              pagado: "Si",
              consumido: "No",
            };
            this.abona_p = 0;

            this.reservaservice.add(datos90).subscribe((res) => {
              this.reservaservice
                .get_filtro(this.identity._id)
                .subscribe((data2: Reserva[]) => {
                  this.reservas = data2;
                  this.paga_vianda(this.fecha_s[indice_ff1]);
                  this.cambia_f();
                  this.abona_p = 1;
                });
            });
          }
        } else {
//          if (!this.cuenta)
//            this.notifier.notify("warning", "Cargá dinero en tu cuenta");
        }
      }
    
  }

  paga_vianda(dia_x) {
    var dia = dia_x.substr(8, 2);
    var mes = dia_x.substr(5, 2);
    var datos00 = {
      usuario: this.identity._id,
      f_fecha: this.fecha_servidor,
      tmov: this.tmovs[1]._id,
      detalle: "Vianda del " + dia + "/" + mes,
      importe_d: 0,
      importe_h: Number(this.importe00),
    };
    this.moneyservice.add(datos00).subscribe((res) => {
      this.moneyservice
        .get_filtro(this.identity._id)
        .subscribe((data2: Money[]) => {
          this.money = data2;
          this.obt_saldo(this.identity._id);
        });
    });
  }

  calcula_estado() {
    var e_gral = 0;
    if (this.mdias_f3.length == 0) {
      // Sin Menu
      e_gral = 1;
    } else {
      if (typeof (this.reservas_f[0]) == undefined || this.reservas_f[0] == null) {
        if (this.posible.minutos_t > 0) {
          // Sin pagar y con Tienmpo
          e_gral = 2;
        } else {
          // Te lo perdiste
          /// ESTE ES EL QUE VOLVER AL VALOOOOOOOOOOOOOOOOOOOOOOOOOOR DE 3
          e_gral = 3;
        }
      } else {

        if (this.reservas_f[0].consumido == "No") {
          // Pagado y Sin Retirar
          e_gral = 4;
        } else {
          e_gral = 5;
          // Pagado y Retirado
        }
      }
    }
    return e_gral;
  }

  cambia_d(puntero) {
    this.importe = this.identity.clase.importe;
    var dias = puntero;
    var fecha_a = this.angForm_2.value.fecha_solicitud;
    var dia1 = fecha_a.substr(8, 2);
    var mes1 = fecha_a.substr(5, 2);
    var anyo1 = fecha_a.substr(0, 4);
    var nuevafecha = new Date(anyo1 + "," + mes1 + "," + dia1);
    // Sumamos los dias a la fecha
    nuevafecha.setDate(nuevafecha.getDate() + dias);
    // Obtenemos el dia, mes y año de la fecha de devolucion
    var dia2 = nuevafecha.getDate();
    var mes2 = nuevafecha.getMonth() + 1;
    var anio2 = nuevafecha.getFullYear();
    var dia3 = "";
    var mes3 = "";
    if (dia2 < 10) {
      dia3 = "0" + dia2.toString();
    } else {
      dia3 = dia2.toString();
    }
    if (mes2 < 10) {
      mes3 = "0" + mes2.toString();
    } else {
      mes3 = mes2.toString();
    }
    var nuevafecha2 = anio2.toString() + "-" + mes3 + "-" + dia3;
    this.angForm_2 = this.fb.group({
      fecha_solicitud: nuevafecha2,
      tmenu: this.prefiere,
      importe_solicitud: this.importe,
      cantidad_viandas: 1,
      codi_menu: ""
    });
    this.cambia_f();
    this.d_semana();
  }

  d_semana() {
    var fecha_a = this.angForm_2.value.fecha_solicitud;
    var dia1 = fecha_a.substr(8, 2);
    var mes1 = fecha_a.substr(5, 2);
    var anyo1 = fecha_a.substr(0, 4);
    var nuevafecha = new Date(anyo1 + "," + mes1 + "," + dia1);
    var diasSemana = new Array(
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    );
    this.dia_semana = diasSemana[nuevafecha.getDay()];
  }

  fecha_formateada() {
    var fecha_a = this.angForm_2.value.fecha_solicitud;
    var dia1 = fecha_a.substr(8, 2);
    var mes1 = fecha_a.substr(5, 2);
    var anyo1 = fecha_a.substr(0, 4);
    var nuevafecha = dia1 + "-" + mes1 + "-" + anyo1;
    return nuevafecha;
  }

  callType(indice_ff1,seleccion){
    
    var indicador=0;
    var largo_i = this.obt_m1[indice_ff1].length;

    for (let v = 0; v < largo_i; v++) {
      if (seleccion == this.obt_m1[indice_ff1][v]) { indicador = v }
    }
    if (seleccion == "") {indicador=1}
    this.maqueta[indice_ff1][3]=this.obt_m3[indice_ff1][indicador]
  }

}
