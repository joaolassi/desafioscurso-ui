import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
    ) { }

  handle(errorResponse: any) {
    const errorStatus = errorResponse.status;
    let msg: string;

    if(typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse && errorStatus >= 400 && errorStatus <= 499) {
      msg = 'Recurso não foi encontrado';

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) {}
    }
    else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity:'error', detail: msg });
  }
}
