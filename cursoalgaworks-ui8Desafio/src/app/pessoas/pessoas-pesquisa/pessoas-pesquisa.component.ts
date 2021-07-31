import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
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
