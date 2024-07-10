import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.usuarioService.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  editarUsuario(usuario: Usuario) {
    this.router.navigate(['/editar', usuario.codigo]);
  }

  removerUsuario(usuario: Usuario) {
    this.usuarios = this.usuarios.filter((u) => u.codigo !== usuario.codigo);
  }
}
