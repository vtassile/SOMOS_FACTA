import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-403',
  template: `
    <error-code
      code="403"
      [title]="'Permiso Denegado!'"
      [message]="'No tenés permiso para acceder a los datos requeridos.'"
    ></error-code>
  `,
})
export class Error403Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
