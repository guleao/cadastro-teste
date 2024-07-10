import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  getUsuario(codigo: string | null): any {
    return this.usuarios.find((usuario) => usuario.codigo === codigo);
  }
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

  atualizarUsuario(usuarioAtualizado: Usuario) {
    const index = this.usuarios.findIndex(
      (usuario) => usuario.codigo === usuarioAtualizado.codigo,
    );
    if (index !== -1) {
      this.usuarios[index] = usuarioAtualizado;
    }
  }
}
