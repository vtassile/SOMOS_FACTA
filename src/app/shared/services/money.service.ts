// money.service.ts

import { FormsModule, FormGroup,  FormBuilder,  FormControl, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators'; 
import { Observable } from 'rxjs';

import {MONEY} from "@shared";

@Injectable()
export class MoneyService {
	public url: string;
	public token;
	
	constructor (private _http: HttpClient){ this.url = MONEY.url;}

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

	get_filtro2(id){
	  let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
	  return this._http.get(`${this.url}/list3/${id}`,options);    
	}

	get_desde(id){
	  let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
	  return this._http.get(`${this.url}/list4/${id}`,options);    
	}

	get_hasta(id){
	  let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
	  return this._http.get(`${this.url}/list5/${id}`,options);    
	}

	get_d_h(desde,hasta,tipo_m){
    	let headers = new HttpHeaders({"Content-Type": "application/json"});
    	let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
		return this._http.get(`${this.url}/list6/${desde}&${hasta}&${tipo_m}`,options);    
	}

	get_saldo(id){
	  let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
	  return this._http.get(`${this.url}/saldo/${id}`,options);    
	}

	get_acumula(fecha){
	  let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
	  return this._http.get(`${this.url}/acumula/${fecha}`,options);    
	}

	add(datos) {
		let json = JSON.stringify(datos);
		let params = json;
		let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
		return this._http.post(this.url+"/add",params,options);		
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

	update(usuario, f_fecha, tmov, detalle, importe_d, importe_h, id) {
		const datos = {
	      usuario : usuario,
	      f_fecha : f_fecha,
	      tmov : tmov,
	      detalle: detalle,
	      importe_d : importe_d,
	      importe_h : importe_h
	    };
		let json = JSON.stringify(datos);
		let params = datos;
		let headers = new Headers({"Content-Type": "application/json"});
	    let options = {headers: new HttpHeaders({"Content-Type": "application/json","Authorization":this.getToken()})};
		return this._http.post(`${this.url}/update/${id}`,params,options)		
	    	.subscribe(res => console.log('Done'));
	}
}

