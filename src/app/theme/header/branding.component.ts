import { Component } from '@angular/core';
import { SeteoService } from "@shared/services/seteo.service";

import { Seteo } from "@shared";

@Component({
  selector: 'app-branding',
  template: `
    <a *ngIf="seteo"  class="matero-branding" >
      <img src="{{seteo.imagen_1}}" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">{{seteo.titulo_principal}}  &nbsp;</span>
      <img src="{{seteo.imagen_2}}" class="matero-branding-logo-expanded" alt="logo" />
    </a>
  `,
})
export class BrandingComponent {
  public seteo: Seteo;

  constructor(private seteoservice: SeteoService) {
    this.seteoservice
      .get()
      .subscribe((data: Seteo[]) => {
        this.seteo = data[0];
      })
  }

}