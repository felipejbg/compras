import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Lista } from '../models/lista.model';
import { API } from '../app.api';
import { ProdutoLista } from '../models/produto-lista.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProdutoListaService {

  constructor(
    private http: HttpClient
  ) { }

  getProdutosNaLista (): Observable<ProdutoLista[]> {
    return this.http.get<ProdutoLista[]>(`${API}/produtoLista`)
      .pipe(
        tap(produtoLista => console.log('Backend OK'))
      );
  }

  deleteProdutoNaLista(lista: Lista) {
    let pl: ProdutoLista[];
    this.getProdutosNaLista()
      .subscribe(produtoLista => {
        pl = produtoLista
        let url;
        for(let i=0; i<pl.length; i++) {
          if(pl[i].id_lista === lista._id) {
            this.del(pl[i]).subscribe();
          }
        }
      });
  }

  del(pl: ProdutoLista): Observable<ProdutoLista> {
    let url = `${API}/produtoLista/${pl._id}`;
    return this.http.delete<ProdutoLista>(url, httpOptions).pipe(
      tap(produto => console.log(`Produtos deletados da lista=${pl._id}`))
    );
  }

  adicionaProdutoNaLista(produtoLista: ProdutoLista): Observable<ProdutoLista> {
    return this.http.post<ProdutoLista>(`${API}/produtoLista`, produtoLista, httpOptions).pipe(
      tap((produtoLista: ProdutoLista) => console.log(`Produto inserido na Lista id=${produtoLista._id}`))
    );
  }

}
