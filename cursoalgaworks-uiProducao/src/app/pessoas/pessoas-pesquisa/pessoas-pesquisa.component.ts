import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid?: Table;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));;
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

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    })
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid?.first === 0) {
          this.pesquisar();
        } else {
          this.grid?.reset();
        }
        this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(pessoa: any) {

    const statusAlterado = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo)
      .then(() => {
        const mudar = statusAlterado ? 'ativada' : 'desativada';

        pessoa.ativo = statusAlterado;

        this.messageService.add({ severity: 'success', detail: `Pessoa foi ${mudar} com sucesso!` });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
