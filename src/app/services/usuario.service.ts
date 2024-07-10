import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  usuarios: Usuario[] = [];
  contador = 1;

  adicionarUsuario(usuario: Usuario) {
    const usuarios = this.usuariosSubject.getValue();
    usuarios.push(usuario);
    this.usuariosSubject.next(usuarios);
    usuario.codigo = this.contador.toString();
    this.usuarios.push(usuario);
    this.contador++;
  }
}
