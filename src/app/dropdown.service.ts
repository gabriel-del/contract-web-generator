import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from './model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    // return this.http.get<EstadoBr>('https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Estados.json')
    return this.http.get<EstadoBr>('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json')

  }
}
