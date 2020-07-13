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


}




