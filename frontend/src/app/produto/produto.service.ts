import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API } from '../app.api';
import { Produto } from '../models/produto.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = `${API}/produto`

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  /** Retorna uma lista de produtos que pertencem a lista passada */
  getProdutos(idlista): Observable<Produto[]> {
    return this.http.get<Produto[]>(url+`?id=${idlista}`).pipe(
      tap(lista => console.log('Carregado produtos.')));
  }

  getProdutoById(_id): Observable<Produto> {
    return this.http.get<Produto>(`${url}/${_id}`).pipe(
      tap(produto => console.log(`Produto carregado ${produto._id}`)));
  }

  insereProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(url, produto, httpOptions).pipe(
      tap((produto: Produto) => console.log(`Produto inserido id=${produto._id}`)));
  }

  deleteProduto(produto: Produto): Observable<Produto> {
    return this.http.delete<Produto>(url+`/${produto._id}`, httpOptions).pipe(
      tap(_ => console.log(`Produto deletado id=${produto._id}`)));
  }

  atualizaProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(url+`/${produto._id}`, httpOptions).pipe(
      tap(_ => console.log(`Produto atualizado id=${produto}`)));
  }

}
