import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Lancamento } from './../core/model';

import * as moment from 'moment';

// Classe para filtrar as pesquisas
export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  // injeção de HttpClient para as requisições
  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content']
        const resultado = {
          lancamentos,
          total: response['totalElements']
        }
        return resultado;
      });

  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');
    // url, corpo (no angular 12 não precisa passar pra json), headers
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
      .toPromise()
      .then(response => {
        // o lançamento a ser atualizado é igual a resposta da requisição
        const lancamentoAtualizado = response;
        //converto as string que vieram da API para op tipo Date
        this.converterStringsParaDatas([lancamentoAtualizado])
        // retorno o lancamento atualizado
        return lancamentoAtualizado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response: any) => {
        // o lançamento a ser buscado é igual a resposta da reqisição
        const lancamentoBuscado = response;
        //converto as string que vieram da API para op tipo Date
        this.converterStringsParaDatas([lancamentoBuscado])
        // retorno o lancamento a ser buscado
        return lancamentoBuscado;
      });

  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    // repetição para percorrer o array de lançamentos
    // Aqui eu digo que "lancamento" é uma constante de "lancamentos"
    for (const lancamento of lancamentos) {
      // segundo a documentação do moment.js assim que deve ser feita a formatação para o tipo date
      // a data de vencimento é igual a data formatada para data
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      // caso exista data de pagamento ela converte
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
