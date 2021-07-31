import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro()
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = 0;
    //verificar se já event.?
    if (event.first && event.rows) {
      // saber o número da página
      pagina = event.first / event.rows;
    }
    this.pesquisar(pagina);
  }
}
