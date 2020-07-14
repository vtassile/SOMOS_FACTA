// mdia.service.ts

import { FormsModule, FormGroup,  FormBuilder,  FormControl, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import { Observable } from 'rxjs';


import {MDIAS} from "@shared";

@Injectable()
export class MDiaService {
	public url: string;
	public token;
	  
	constructor (private _http: HttpClient){
		this.url = MDIAS.url;
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


	get_combo(fecha,tipo_m){
	  const datos = {fecha: fecha,tipo_m: tipo_m};
	  let json = JSON.stringify(datos);
	  let params = datos;
	  console.log(params);
	  let headers = new Headers({"Content-Type": "application/json"});
	  let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
	  return this._http.get(`${this.url}/list5`,options);      
	}


	  add(datos) {
			let json = JSON.stringify(datos);
			let params = json;
			let headers = new Headers({"Content-Type": "application/json"});
		    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

			return this._http.post(this.url+"/add",params,options)		
	        .subscribe(res => console.log('Done'));
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

	update(f_fecha,tmenu,s_detmenu,n_cupo,s_imagen,id) {
		const datos = {
	      f_fecha: f_fecha,
	      tmenu : tmenu,
	      s_detmenu : s_detmenu,
		  n_cupo : n_cupo,
		  s_imagen: s_imagen
	    };
			let json = JSON.stringify(datos);
			let params = datos;
			let headers = new Headers({"Content-Type": "application/json"});
		    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};

			return this._http.post(`${this.url}/update/${id}`,params,options)		
	        .subscribe(res => console.log('Done'));
	}

}