import { Component, OnInit } from '@angular/core';

import { ListaService } from './lista.service';
import { Lista, Produto } from '../models/lista.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  mostraLista: boolean = true;
  mostraProdutos: boolean = false;

  listas: Lista[] = [];
  listaSelecionada: Lista = new Lista();

  np: string = `
    <tr name="produtos">
      <td style="width: 80%">
        <input type="text" placeholder="Nome do produto..." style="width: 100%" name="nomeProduto" />
      </td>
      <td style="width: 20%">
        <select class="form-control" id="sel1" style="width: 100%" name="tipoProduto">
          <option>Alimento</option>
          <option>Casa</option>
          <option>Ferramenta</option>
          <option>Limpeza</option>
        </select>
      </td>
    </tr>
  `;

  constructor(
    private listaService: ListaService
  ) { }

  ngOnInit() {
    this.getListas();
  }

  // Para fazer a tabela em zebra
  isPar(i: number): boolean {
    return ((i%2) === 0)
  }

  getListas(): void {
    this.listaService.getListas()
    .subscribe(li => {
      this.listas = li
    });
  }

  novaLista(nomeLista: string, dataLista: string) {
    let l: Lista = new Lista();
    l.nome = nomeLista;
    l.data = dataLista;
    this.listaService.insereLista(l).subscribe((lista: Lista) => {
        this.listas.push(lista)
    });
  }

  delete(lista: Lista): void {
    this.listas = this.listas.filter(l => l !== lista);
    this.listaService.deleteLista(lista).subscribe((lista: Lista) => {
      console.log(lista);
    });
  }

  produtos(lista: Lista) {
    this.mostraLista = false;
    this.mostraProdutos = true;
    this.listaSelecionada = lista;
  }

  addProduto() {
    // Captura a referência da tabela com id “minhaTabela”
    let tabela = document.getElementById("tabelaProduto");
    // Captura a quantidade de linhas já existentes na tabela
    let numeroLinhas = tabela.rows.length;
    // Insere uma linha no fim da tabela.
    let novaLinha = tabela.insertRow(numeroLinhas).innerHTML = this.np;
  }

  removeProduto() {
    //var table = document.getElementById("tabelaProduto");
    let tabela = document.getElementById("tabelaProduto");
    // Captura a quantidade de linhas já existentes na tabela
    let numeroLinhas = tabela.rows.length;
    // Apaga uma linha no fim da tabela.
    if(numeroLinhas > 0)
      var deletaUltimaLinha = tabela.deleteRow(numeroLinhas-1);
  }

  voltar() {
    this.mostraLista = true;
    this.mostraProdutos = false;
  }

  salvar() {
    var table = document.getElementById("tabelaProduto");
    var np = table.getElementsByTagName("input")
    var tp = table.getElementsByTagName("select")
    let produto: Produto[] = [];
    let p: Produto;
    for (let i = 0; i < np.length; i++) {
      p = new Produto();
      p.nome = np[i].value;
      p.tipo = tp[i].value;
      produto[i] = p;
    }
    let lista = this.listaSelecionada;
    lista.produto = produto;
    this.listaService.atualizaLista(lista).subscribe((lista: Lista) => {

    });
  }

}
