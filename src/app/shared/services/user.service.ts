// user.service.ts

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as CryptoJS from 'crypto-js';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import{SesionService} from "./sesion.service"

import { USUARIOS,CLAVES} from "@shared";

@Injectable()
export class UserService {
  public url: string;
  constructor(private _http: HttpClient, private s_sesion:SesionService) {
    this.url = USUARIOS.url;
  }
  public identity;
  public token;
  public rol_u;
 
  add(datos) {
    let params = JSON.stringify(datos);
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this._http.post(this.url + "/add", params, options);
  }
 
  coincide_usuario(user_nuevo): Observable<any> {
    const datos = {
      user_nuevo: user_nuevo
    };
    let json = JSON.stringify(datos);
    let params = json;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.post(this.url + "/coincideu", params, options);
  }

  coincide_clave(clave_nueva): Observable<any> {
    const datos = {
      clave_nueva: clave_nueva
    };
    let json = JSON.stringify(datos);
    let params = json;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };

    return this._http.post(this.url + "/coincidec", params, options);
  }

  c_reserva(actual, pedido, retraso) {
    const datos = {
      actual: actual,
      pedido: pedido,
      retraso: retraso
    };
    let json = JSON.stringify(datos);
    let params = datos;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.post(`${this.url}/c_reserva`, params, options);
  }

  get() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.get(this.url + "/list", options);
  }

  tget() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.get(this.url + "/tlist", options);
  }

  delete(id) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.get(`${this.url}/delete/${id}`, options);
  }

  edita(id) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.get(`${this.url}/edit/${id}`, options);
  }

  consulta(id) {
    const datos = {
      id: id
    };
    let json = JSON.stringify(datos);
    let params = datos;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.post(`${this.url}/consulta`, params, options);
  }


  update(
    s_username,
    s_name,
    s_surname,
    s_fono,
    s_email,
    clase,
    rol,
    tmenu,
    id,
    id_face,
    id_google,
    s_imagen
  ) {
    const datos = {
      s_username: s_username,
      s_name: s_name,
      s_surname: s_surname,
      s_fono: s_fono,
      s_email: s_email,
      clase: clase,
      rol: rol,
      tmenu: tmenu,
      id_face: id_face,
      id_google: id_google,
      s_imagen: s_imagen
    };
    let json = JSON.stringify(datos);
    let params = datos;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.post(`${this.url}/update/${id}`, params, options);
  }

  resetea(id, s_clave) {
    const datos = {
      s_clave: s_clave
    };
    let json = JSON.stringify(datos);
    let params = datos;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.post(`${this.url}/resetea/${id}`, params, options);
  }

  resetea2(id, vieja_clave, nueva_clave) {
    const datos = {
      vieja_clave: vieja_clave,
      nueva_clave: nueva_clave
    };
    console.log("Esta pasando por el servicio");
    console.log(datos);
    let json = JSON.stringify(datos);
    let params = datos;
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.s_sesion.getToken()
      })
    };
    return this._http.post(`${this.url}/resetea2/${id}`, params, options);
  }
}
