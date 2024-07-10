import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    this.usuario = {
      codigo: '',
      tipoPessoa: '',
      cpf: '',
      nome: '',
      nomeFantasia: '',
      cep: '',
      endereco: '',
      bairro: '',
      cidade: '',
      telefone: '',
      email: '',
    };
  }

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    this.usuario = this.usuarioService.getUsuario(codigo);
  }

  atualizarUsuario() {
    if (
      !this.usuario.tipoPessoa ||
      !this.usuario.cpf ||
      !this.usuario.nome ||
      !this.usuario.cep ||
      !this.usuario.endereco ||
      !this.usuario.bairro ||
      !this.usuario.cidade ||
      !this.usuario.telefone ||
      !this.usuario.email
    ) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(this.usuario.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(this.usuario.telefone)) {
      alert('Por favor, insira um telefone válido.');
      return;
    }

    if (!this.validarCpf(this.usuario.cpf)) {
      alert('Por favor, insira um CPF válido.');
      return;
    }

    this.usuarioService.atualizarUsuario(this.usuario);

    alert('Usuário atualizado com sucesso!');
    this.router.navigate(['/']);
  }

  buscarCep() {
    this.http
      .get(`https://viacep.com.br/ws/${this.usuario.cep}/json/`)
      .subscribe((dados: any) => {
        this.usuario.endereco = dados.logradouro;
        this.usuario.bairro = dados.bairro;
        this.usuario.cidade = dados.localidade;
      });
  }

  formatarTelefone() {
    let telefone = this.usuario.telefone;
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    this.usuario.telefone = telefone;
  }

  formatarCpf() {
    let cpf = this.usuario.cpf;
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.usuario.cpf = cpf;
  }

  validarCpf(cpf: string) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    for (let t = 9; t < 11; t++) {
      let d = 0;

      for (let i = 0; i < t; i++) {
        d += parseInt(cpf.charAt(i)) * (t + 1 - i);
      }

      d = ((10 * d) % 11) % 10;

      if (cpf.charAt(t) !== d.toString()) {
        return false;
      }
    }

    return true;
  }
}
