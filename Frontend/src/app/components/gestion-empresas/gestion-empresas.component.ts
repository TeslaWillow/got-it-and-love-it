import { Component, OnInit } from '@angular/core';
import { EmpresasService, Empresa } from '../../services/empresas.service';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.css']
})
export class GestionEmpresasComponent implements OnInit {

  public empresas:Empresa[];
  public totalEmpresas:number = 0;
  public desde:number = 0;
  public hasta:number = 9;

  constructor(private _EmpresasService:EmpresasService) { }

  ngOnInit(): void {
    this._EmpresasService.GET_Empresas().subscribe(
      (res:any) => {
        this.empresas = res.data;
        this.totalEmpresas = res.data.length;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

}
