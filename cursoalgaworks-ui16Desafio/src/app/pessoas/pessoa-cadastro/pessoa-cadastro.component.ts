import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { Pessoa } from 'src/app/core/model';
import { Endereco } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  endereco = new Endereco();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa')

    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }


  adicionarPessoa(form: NgForm) {
    return this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarPessoa(form: NgForm) {
    return this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });
        this.atualizarTituloEdicao();
      })
  }

  novo(form: NgForm) {
    form.reset(new Pessoa());

    this.router.navigate(['/pessoas/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Editar Pessoa: ${this.pessoa.nome}`)
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscaPorCodigo(codigo)
      .then(pessoa => {
        // substituo a instância atual pela nova instância
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
