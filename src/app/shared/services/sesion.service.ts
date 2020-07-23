// sesion.service.ts

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as CryptoJS from 'crypto-js';
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

import { USUARIOS } from "@shared";
import { CLAVES } from "@shared";

@Injectable()
export class SesionService {

  public url: string;
  constructor(private _http: HttpClient) {
    this.url = USUARIOS.url;
  }

  public identity;
  public token;
  public rol_u;
  
  signup(user_to_login, gethash = null): Observable<any> {
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this._http.post(this.url + "/login", params, options);
  }

  signup_face(user_to_login, gethash = "false"): Observable<any> {
    let datos = {
      id_face: user_to_login,
      gethash: "false"
    };

    if (gethash == "true") {
      datos = {
        id_face: user_to_login,
        gethash: gethash
      };
    }

    let json = JSON.stringify(datos);
    let params = json;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this._http.post(this.url + "/login_face", params, options);
  }

  signup_google(user_to_login, gethash = "false"): Observable<any> {
    let datos = {
      id_google: user_to_login,
      gethash: "false"
    };

    if (gethash == "true") {
      datos = {
        id_google: user_to_login,
        gethash: gethash
      };
    }

    let json = JSON.stringify(datos);
    let params = json;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this._http.post(this.url + "/login_google", params, options);
  }

  getToken() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getIdentity() {
    let identidad = localStorage.getItem("identity");
    if (identidad != "undefined" || !identidad || identidad != null) {
      var identidad2 = CryptoJS.AES.decrypt(identidad.trim(), CLAVES.localstore.toString()).toString(CryptoJS.enc.Utf8);
    } else {
      this.identity = null;
    }
    this.identity=JSON.parse(identidad2);
    return this.identity;
  }

  getRol() {
    let rol = 0;
    let identidad = localStorage.getItem("identity");
    if (identidad != "undefined" || !identidad) {
      let identidad_2 = CryptoJS.AES.decrypt(identidad.trim(), CLAVES.localstore.toString()).toString(CryptoJS.enc.Utf8);
      rol = identidad_2.rol.n_nivel;
    }
    return rol;
  }

  logout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    localStorage.removeItem("rol_u");
    this.identity = null;
    this.token = null;
    this.rol_u = null;
  }

  fecha_servidor() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.getToken()
      })
    };
    return this._http.get(this.url + "/fecha", options);
  }

  d_semana(fecha_a) {
    //   var fecha_a = this.angForm_2.value.fecha_solicitud;
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
       return diasSemana[nuevafecha.getDay()];
     }
   
     n_semana(fecha_a) {
       //   var fecha_a = this.angForm_2.value.fecha_solicitud;
          var dia1 = fecha_a.substr(8, 2);
          var mes1 = fecha_a.substr(5, 2);
          var anyo1 = fecha_a.substr(0, 4);
          var nuevafecha = new Date(anyo1 + "," + mes1 + "," + dia1);
          return nuevafecha.getDay();
        }
   
     fecha_formateada(fecha_a) {
       var dia1 = fecha_a.substr(8, 2);
       var mes1 = fecha_a.substr(5, 2);
       var anyo1 = fecha_a.substr(0, 4);
       var nuevafecha = dia1 + "-" + mes1 + "-" + anyo1;
       return nuevafecha;
     }
   
     fecha_corta(fecha_a) {
        var nuevafecha=(fecha_a.format("YYYY-MM-DD")).toString();

      return nuevafecha;
    }

     cambia_fecha(fecha_a,dias) {
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
      return nuevafecha2;
     }
   







}




