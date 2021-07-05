import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getSeasons() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/leagues/seasons';
    const headers = new HttpHeaders().append(
      'x-rapidapi-key', '101984ae51msh7ae161dc9760af1p1b6b5cjsna4ed353c3459',
      ).append(
      'x-rapidapi-host', 'api-football-v1.p.rapidapi.com'
      )
    return this.http.get(url , {headers})

  }

  getCoutries() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/countries';
    const headers = new HttpHeaders().append(
      'x-rapidapi-key', '101984ae51msh7ae161dc9760af1p1b6b5cjsna4ed353c3459',
      ).append(
      'x-rapidapi-host', 'api-football-v1.p.rapidapi.com'
      )
    return this.http.get(url, { headers })
  }

}
