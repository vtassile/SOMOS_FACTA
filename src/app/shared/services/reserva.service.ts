// reserva.service.ts

import { FormsModule, FormGroup,  FormBuilder,  FormControl, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import { Observable } from 'rxjs';


import {RESERVAS} from "@shared";

@Injectable()
export class ReservaService {
  public url: string;
  public token;

  constructor (private _http: HttpClient){
    this.url = RESERVAS.url;
  }

getToken(){
  let token = localStorage.getItem("token");
  if (token!="undefined"){ this.token = token;
  }else{ this.token= null; }
  return this.token;
}

get(){
  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
  return this._http.get(this.url+"/list",options);    
}

get_filtro(id){
  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
  return this._http.get(`${this.url}/list2/${id}`,options);    
}

get_pago(pagado){
  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
  return this._http.get(`${this.url}/list3/${pagado}`,options);    
}

get_consumo(consumido){
  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
  return this._http.get(`${this.url}/list4/${consumido}`,options);    
}

get_combo(pagado,consumido){
  const datos = {
      pagado: pagado,
      consumido: consumido
    };
  let json = JSON.stringify(datos);
  let params = datos;

  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

  return this._http.get(`${this.url}/list5`,options);      
}

post_combo2(pagado,consumido,fecha_i,fecha_com){
  const datos = {
    pagado: pagado,
    consumido: consumido,
    fecha_i:fecha_i,
    fecha_com:fecha_com
  };
  let json = JSON.stringify(datos);
  let params = datos;
  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

  return this._http.post(`${this.url}/list6`,params,options);   
}

post_combo3(pagado,consumido,fecha_i,fecha_f){
  const datos = {
    pagado: pagado,
    consumido: consumido,
    fecha_i:fecha_i,
    fecha_f:fecha_f
  };
  let json = JSON.stringify(datos);
  let params = datos;
  let headers = new Headers({"Content-Type": "application/json"});
    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

  return this._http.post(`${this.url}/list7`,params,options);   
}




add(datos) {
    let json = JSON.stringify(datos);
    let params = json;
    let headers = new Headers({"Content-Type": "application/json"});
      let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

    return this._http.post(this.url+"/add",params,options);    
//        .subscribe(res => console.log('Done'));
  }


delete(id) {
  let headers = new Headers({"Content-Type": "application/json"});
  let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
  return this._http.get(`${this.url}/delete/${id}`,options); 
}


edit(id) {
  let headers = new Headers({"Content-Type": "application/json"});
  let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
  return this._http.get(`${this.url}/edit/${id}`,options); 
}

update(n_usuario,f_fecha,n_menu,n_cantidad,tmov,importe,pagado,consumido,id) {
  const datos = {
      n_usuario: n_usuario,
      f_fecha: f_fecha,
      n_menu: n_menu,
      n_cantidad: n_cantidad,
      tmov : tmov,
      importe: importe,
      pagado: pagado,
      consumido: consumido
    };
    let json = JSON.stringify(datos);
    let params = datos;
    let headers = new Headers({"Content-Type": "application/json"});
      let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

    return this._http.post(`${this.url}/update/${id}`,params,options);   

}


  pago(pagado,fecha_p,id) {
    const datos = {
        pagado: pagado,
        fecha_p : fecha_p
      };
      let json = JSON.stringify(datos);
      let params = datos;
      let headers = new Headers({"Content-Type": "application/json"});
        let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
      return this._http.post(`${this.url}/update2/${id}`,params,options);   
  }

  consumo(accion,id) {
    const datos = {
        consumido: accion
      };
      let json = JSON.stringify(datos);
      let params = datos;
      let headers = new Headers({"Content-Type": "application/json"});
        let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
      return this._http.post(`${this.url}/update3/${id}`,params,options);   
  }


}

