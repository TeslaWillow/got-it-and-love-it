import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;
  constructor(
    private http:HttpClient
  ) { }

  SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
  }

  GET_Empresas(){
    return this.http.get(`${this.URL_BACKEND}/empresas/`);
  }

  GET_Empresa(_idEmpresa:string){
    return this.http.get(`${this.URL_BACKEND}/empresas/${_idEmpresa}`);
  }

  GET_EmpresaUsuario() {
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/empresas/usuario/empresa` , this.httpOptions);
  }

  POST_Empresa(nuevaEmpresa:JSON){
    this.SET_Headers();
    console.log(nuevaEmpresa);
    return this.http.post(`${this.URL_BACKEND}/empresas/`, nuevaEmpresa, this.httpOptions);
  }

  PUT_Empresa(_idEmpresa:string, empresaActualizada:JSON){
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/empresas/${_idEmpresa}`, empresaActualizada, this.httpOptions);
  }

  DELETE_Empresa(){}
}
export interface Empresa{
  _id: number,
  nombre: string,
  direccion: string,
  foto: string,
  rubro: string[],
  productos: number[],
  paginas: any[]
}