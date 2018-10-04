import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Lista } from '../models/lista.model';
import { API } from '../app.api';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = `${API}/lista`

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(
    private http: HttpClient
  ) { }

  getListas (): Observable<Lista[]> {
    return this.http.get<Lista[]>(url+'/sort').pipe(
      tap(lista => console.log('Carregada listas ordenadas por data.')));
  }

  getListaById(_id): Observable<Lista> {
    return this.http.get<Lista>(`${url}/${_id}`).pipe(
      tap(lista => console.log(`Lista carregada ${lista._id}`)));
  }

  insereLista(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(url, lista, httpOptions).pipe(
      tap((lista: Lista) => console.log(`Lista inserida id=${lista._id}`)));
  }

  deleteLista(lista: Lista): Observable<Lista> {
    return this.http.delete<Lista>(url+`/${lista._id}`, httpOptions).pipe(
      tap(_ => console.log(`Lista deletada id=${lista._id}`)));
  }

  atualizaLista(lista: Lista): Observable<Lista> {
    console.log(lista)
    return this.http.put<Lista>(url+`/${lista._id}`, httpOptions).pipe(
      tap(_ => console.log(`Lista atualizada id=${lista}`)));
  }

}
