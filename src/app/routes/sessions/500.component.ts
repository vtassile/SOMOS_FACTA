import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-500',
  template: `
    <error-code
      code="500"
      [title]="'Servidor funcionado incorrectamente!'"
      [message]="'Parece una broma, tenemos un problema interno, intenta actualizar.'"
    >
    </error-code>
  `,
})
export class Error500Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
