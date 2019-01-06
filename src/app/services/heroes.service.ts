import { Heroe } from './../interfaces/heroe.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private firebaseURL = 'https://ng-firebase-crud-b6c72.firebaseio.com/heroes.json';
  private firebaseHeroeURL = 'https://ng-firebase-crud-b6c72.firebaseio.com/heroes/';

  constructor(private http: HttpClient) { }

  store(heroe: Heroe) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.firebaseURL, body, { headers });
  }

  getAll() {
    return this.http.get(this.firebaseURL);
  }

  get(key$: string) {
    const url = `${ this.firebaseHeroeURL }/${ key$ }.json`;
    return this.http.get(url);
  }

  update(heroe: Heroe, key$: string) {
    const body = JSON.stringify(heroe);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${ this.firebaseHeroeURL }/${ key$ }.json`;

    return this.http.put(url, body, { headers });
  }

  delete(key$: string) {
    const url = `${ this.firebaseHeroeURL }/${ key$ }.json`;
    return this.http.delete(url);
  }
}
