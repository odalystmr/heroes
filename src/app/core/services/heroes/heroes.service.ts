import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}heroes`);
  }

  // getHeroesById(id: string | null): Observable<Heroe[]> {
  getHeroesById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}heroes/${id}`);
  }

  getHeroesByQuery(query: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}heroes?q=${query}`);
  }

  addHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}heroes`, heroe);
  }

  editHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}heroes/${heroe.id}`, heroe);
  }

  deleteHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}heroes/${id}`);
  }

}
