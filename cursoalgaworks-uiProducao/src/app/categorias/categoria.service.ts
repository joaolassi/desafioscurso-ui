import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;


  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then();
  }
}
