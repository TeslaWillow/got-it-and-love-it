import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService, Producto } from '../../services/productos.service';
import { Categoria, CategoriasService } from '../../services/categorias.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  public productos:Producto[];
  public categorias:Categoria[];
  public formProductos:FormGroup;
  public formCategorias:FormGroup;
  public imagen:string;

  @ViewChild('modalCrearCategoria') modalCrearCategoria;
  @ViewChild('modalVerCategorias') modalVerCategorias;
  @ViewChild('modalCrearProducto') modalCrearProducto;
  @ViewChild('modalEditarProducto') modalEditarProducto;

  constructor(
    private _NgModel:NgbModal,
    private _ProductosService:ProductosService,
    private _CategoriasService:CategoriasService,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef
  ) { 
    this.crearFormularios();
  }

  ngOnInit(): void {
    this.productos = this._ProductosService.getProductos();
  }

  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  unaFuncion(event:any){
    if(event.target.files && event.target.files.length > 0){
      const archivo = (event.target as HTMLInputElement).files[0];
      if(archivo.type.split("/")[0] === "image"){
        this.formProductos.patchValue({
          foto: archivo
        });
        this.formProductos.get('foto').updateValueAndValidity();
    
        //preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagen = reader.result as string;
        };
        reader.readAsDataURL(archivo);
      }else{
        this.imagen = null;
      }
    }
  }

  verCategorias(){
    this.categorias = this._CategoriasService.getCategorias();
    this._NgModel.open(this.modalVerCategorias, {size: "lg"});
  }

  crearCategoria(){
    this._NgModel.open(this.modalCrearCategoria, {size: "lg"});
  }

  limpiarFormularioProductos(){
    this.formProductos.reset();
    this.imagen = null;
  }

  crearProducto(){
    this.limpiarFormularioProductos();
    this.categorias = this._CategoriasService.getCategorias();
    this._NgModel.open(this.modalCrearProducto, {size: "lg"});
  }

  editarProducto(_id:number){
    this.limpiarFormularioProductos();
    let producto:Producto = this._ProductosService.getProducto(_id);
    this.categorias = this._CategoriasService.getCategorias();
    this.formProductos.reset({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      foto: producto.foto
    });
    this._NgModel.open(this.modalEditarProducto, {size: "lg"});
  }

  crearFormularios(){
    this.formProductos = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]],
      descripcion: ['', [
        Validators.maxLength(500)
      ]],
      precio: ['', [
        Validators.required,
        Validators.min(0.99),
        Validators.max(9999999)
      ]],
      foto: ['',  [
        RxwebValidators.file({minFiles:1, maxFiles:1 }),
        RxwebValidators.extension({extensions:["jpeg","gif","png","jpg"]})
      ]],
      categoria: ['', [
        Validators.required
      ]]
    });
  
    this.formCategorias = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(2)
      ]],
      descripcion: ['', [
        Validators.maxLength(200)
      ]]
    });
  }

  guardarProducto(){
    if(this.formProductos.invalid){
      return Object.values(this.formProductos.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Guardando producto", this.formProductos.value);
    }
  }

  actualizarProducto(){
    if(this.formProductos.invalid){
      return Object.values(this.formProductos.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Producto Actualizado", this.formProductos.value);
    }
  }

  guardarCategoria(){
    if(this.formCategorias.invalid){
      return Object.values(this.formCategorias.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Categoria guardada:", this.formCategorias.value);
    }
  }
}
