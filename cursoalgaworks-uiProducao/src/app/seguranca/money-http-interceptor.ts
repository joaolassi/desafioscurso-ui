import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export class NotAuthenticatedError {}

@Injectable()

export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // verifica se o caminho for oauth/token e se o token está inválido
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalid()) {
      // se a condição for true ...
      return from(this.auth.obterNovoAccessToken())
        .pipe(
          // mergemap junta os dois observables
          mergeMap(() => {
            if (this.auth.isAccessTokenInvalid()) {
              throw new NotAuthenticatedError();
            }
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            return next.handle(req);
          })
        );
    }
    // caso o token esteja válido ele continua
    return next.handle(req);
  }
}
