// seteo.service.ts

import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Seteo } from '@shared';
import { SETEO } from "@shared";

@Injectable()
export class SeteoService {
	public url: string;
	public token;

	constructor(private _http: HttpClient) {
		this.url = SETEO.url;
	}

	getToken() {
		let token = localStorage.getItem("token");
		if (token != "undefined") {
			this.token = token;
		} else { this.token = null; }
		return this.token;
	}

	get() {
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = { headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": this.getToken() }) };
		return this._http.get(this.url + "/list", options);
	}


	add(datos) {
		let json = JSON.stringify(datos);
		let params = json;
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = { headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": this.getToken() }) };
		return this._http.post(this.url + "/add", params, options)
			.subscribe(res => console.log('Done'));
	}


	delete(id) {
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = { headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": this.getToken() }) };
		return this._http.get(`${this.url}/delete/${id}`, options);
	}


	edit(id) {
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = { headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": this.getToken() }) };
		return this._http.get(`${this.url}/edit/${id}`, options);
	}

	update(seteo_datos: Seteo) {
		const datos = { ...seteo_datos };
		let json = JSON.stringify(datos);
		let params = json;
		var id = datos._id;
		let headers = new Headers({ "Content-Type": "application/json" });
		let options = { headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": this.getToken() }) };
		return this._http.post(`${this.url}/update/${id}`, params, options)
			.subscribe(res => console.log('Done'));
	}

}


