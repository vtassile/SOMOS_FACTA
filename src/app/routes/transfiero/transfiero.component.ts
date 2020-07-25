import {
  Component,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ElementRef,
  OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { User } from "@shared/models/user.model";
import { Money } from "@shared/models/money.model";
import { TMov } from "@shared/models/tmov.model";
import { Seteo } from "@shared/models/seteo.model";

import { UserService } from "@shared/services/user.service";
import { MoneyService } from '@shared/services/money.service';
import { TMovService } from '@shared/services/tmov.service';
import { SeteoService } from "@shared/services/seteo.service";
import { SesionService } from "@shared/services/sesion.service";

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: "app-transfiero",
  templateUrl: "./transfiero.component.html",
  styleUrls: ["./transfiero.component.scss"],
})
export class TransfieroComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  public identity;
  moneys: Money[];
  tmovs: TMov[];
  data_11: User[];
  usuarios: string[] = [];
  u_id: string[] = [];
  u_nombre: string[] = [];
  u_apellido: string[] = [];
  nombre: string = "";
  apellido: string;
  seteo: Seteo[];

  angForm_2: FormGroup;
  public fecha_servidor;
  public query3 = "";
  public puede_escanear = "No";
  cuenta: any = {};
  message: string = "Cambiar";
  public permite;
  keyword = 's_username';

  @ViewChild("importe_d") nameField: ElementRef;

  constructor(
    public router: Router,
    private _userService: UserService,
    private tmovservice: TMovService,
    private seteoservice: SeteoService,
    private moneyservice: MoneyService,
    private _sesionService: SesionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.permite = true;
    let temporal = this._sesionService.getIdentity();
    this.identity = JSON.parse(temporal);

    this._sesionService.fecha_servidor().subscribe(data => {
      this.fecha_servidor = data;
      this.angForm_2 = this.fb.group({
        usuario: "",
        f_fecha: this.fecha_servidor,
        tmov: "",
        detalle: "Transferencia",
        importe_d: [null, [Validators.required, Validators.minLength(2)]],
        importe_h: 0,
        contrasena: ""
      });
    });

    this._userService.get().subscribe((data_10: User[]) => {
      this.data_11 = data_10;
      for (var _i = 0; _i < data_10.length; _i++) {
        this.u_id.push(data_10[_i]._id);
        this.usuarios.push(data_10[_i].s_username);
        this.u_nombre.push(data_10[_i].s_name);
        this.u_apellido.push(data_10[_i].s_surname);
      }
      this.query3 = "Algo";
    });

    this.tmovservice.get().subscribe((data2: TMov[]) => {
      this.tmovs = data2;
    });

    this.moneyservice
      .get_filtro(this.identity._id)
      .subscribe((data2: Money[]) => {
        this.obt_saldo(this.identity._id);
      });

    this.seteoservice.get().subscribe((data2: Seteo[]) => {
      this.seteo = data2;
    });

    this.angForm_2 = this.fb.group({
      usuario: "",
      f_fecha: "",
      tmov: "",
      detalle: "",
      importe_d: [null, [Validators.required, Validators.minLength(2)]],
      importe_h: 0,
      contrasena: ""
    });
  }

  selectEvent(result) {
    this.permite = false;
    this.query3 = result.s_username;
    this.cambia_u(this.query3);

    this.permite = true;
    this.nameField.nativeElement.focus();
  }

 
  addPago() {
    if (this.query3 != "") {
      if (this.angForm_2.value.importe_d != null) {
        if (this.cuenta) {
          var datos10 = {
            s_username: this.identity.s_username,
            s_clave: this.angForm_2.value.contrasena
          };
          this._sesionService.signup(datos10).subscribe(
            response => {
              var c_limite = this.cuenta.Saldo - this.angForm_2.value.importe_d;
              if (c_limite < this.seteo[0].m_saldo) {
                //           this.notifier.notify("warning", "Te excediste de tu limite");
              } else {
                var datos = {
                  usuario: this.angForm_2.value.usuario,
                  f_fecha: this.angForm_2.value.f_fecha,
                  tmov: this.tmovs[3]._id,
                  detalle: "Transferencia de " + this.identity.s_username,
                  importe_d: this.angForm_2.value.importe_d,
                  importe_h: 0
                };
                this.moneyservice.add(datos).subscribe(res => {
                  var datos2 = {
                    usuario: this.identity._id,
                    f_fecha: this.angForm_2.value.f_fecha,
                    tmov: this.tmovs[3]._id,
                    detalle: "Transferencia a " + this.query3,
                    importe_d: 0,
                    importe_h: this.angForm_2.value.importe_d
                  };
                  this.moneyservice
                    .add(datos2)
                    .subscribe(res => {
                      //            this.notifier.notify("success", "Operacion Exitosa");
                    }
                    );
                  this.obt_saldo(this.identity._id);

                  this.sendMessage();
                  this.query3 = "";
                  this.angForm_2 = this.fb.group({
                    usuario: "",
                    f_fecha: this.fecha_servidor,
                    tmov: "",
                    detalle: "Transferencia",
                    importe_d: [
                      null,
                      [Validators.required, Validators.minLength(2)]
                    ],
                    importe_h: 0,
                    contrasena: ""
                  });
                });
              }
            },
            error => {
              //        this.notifier.notify("warning", "Contraseña Incorrecta");
            }
          );
        } else {
          //      this.notifier.notify("warning", "Cargá dinero en tu cuenta");
        }
      }
    }
  }

  obt_saldo(comensal) {
    return this.moneyservice.get_saldo(comensal).subscribe(data2 => {
      this.cuenta = data2[0];
    });
  }

  cambia_u(usuario) {
    var guarda = usuario;
    var indice = this.usuarios.indexOf(guarda);
    this.nombre = this.u_nombre[indice];
    this.apellido = this.u_apellido[indice];

    this.angForm_2 = this.fb.group({
      usuario: this.u_id[indice],
      f_fecha: this.fecha_servidor,
      tmov: "",
      detalle: "Transferencia",
      importe_d: [null, [Validators.required, Validators.minLength(2)]],
      importe_h: 0,
      contrasena: ""
    });
  }

  cambia_id(id) {
    var guarda = id;
    var indice = this.u_id.indexOf(guarda);
    this.query3 = this.usuarios[indice];
    this.nombre = this.u_nombre[indice];
    this.apellido = this.u_apellido[indice];

    this.angForm_2 = this.fb.group({
      usuario: this.u_id[indice],
      f_fecha: this.fecha_servidor,
      tmov: "",
      detalle: "Transferencia",
      importe_d: [null, [Validators.required, Validators.minLength(2)]],
      importe_h: 0,
      contrasena: ""
    });
  }

  sendMessage() {
    this.messageEvent.emit(this.message);
  }
}

