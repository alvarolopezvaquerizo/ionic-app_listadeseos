import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})

export class DeseosService {

  listas: Lista[] = [];

  constructor() {

    this.cargarStorage();

  }

  crearLista( titulo: string ) {

    const nuevaLista = new Lista(titulo);
    this.listas.push( nuevaLista );
    // Guardo la lista en el Storage
    this.guardarStorage();

    // Devuelvo el Id de la lista
    return nuevaLista.id;

  }

  borrarLista( lista: Lista ) {

    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );
    this.guardarStorage();

  }

  obtenerLista( id: string | number ) {

    id = Number(id);

    return this.listas.find( listaData => listaData.id === id );

  }

  guardarStorage() {

    // Con JSON.stringify lo transformo a un string
    localStorage.setItem('data', JSON.stringify(this.listas));

  }

  cargarStorage() {

    if ( localStorage.getItem('data') ) {
      // Con JSON.parse lo transformo a formato de arreglo
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }

  }

}
