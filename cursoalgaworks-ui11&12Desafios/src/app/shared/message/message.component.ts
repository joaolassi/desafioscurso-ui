import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  // chama o método tem erro pra regra de negócio
  template: `
  <div *ngIf="temErro()" class="p-message p-message-error">
    {{ text }}
  </div>`,
  styles: [`
  .p-message-error {
    padding: 3px;
    margin: 0;
    margin-top: 4px;
  }
  `]
})
export class MessageComponent {

  // Decorator Input propriedade de entrada
  // automaticamente atualiza os dados do input
  @Input() error: string ='';
  @Input() control: FormControl = new FormControl();
  @Input() text: string ='';

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
