import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"},
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"},
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"},
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"},
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"},
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"},
    {nome: "João Lassi", cidade:"Brasília", estado:"Distrito Federal", status:"ativo"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
