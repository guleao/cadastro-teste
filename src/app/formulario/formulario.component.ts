import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  tipoPessoa = 'Fisica';
  cpf = '';
  nome = '';
  nomeFantasia = '';
  cep = '';
  endereco = '';
  bairro = '';
  cidade = '';
  telefone = '';
  email = '';

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  buscarCep() {
    this.http
      .get(`https://viacep.com.br/ws/${this.cep}/json/`)
      .subscribe((dados: any) => {
        this.endereco = dados.logradouro;
        this.bairro = dados.bairro;
        this.cidade = dados.localidade;
      });
  }

  cadastrarUsuario() {
    if (
      !this.tipoPessoa ||
      !this.cpf ||
      !this.nome ||
      !this.cep ||
      !this.endereco ||
      !this.bairro ||
      !this.cidade ||
      !this.telefone ||
      !this.email
    ) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(this.telefone)) {
      alert('Por favor, insira um telefone válido.');
      return;
    }

    if (!this.validarCpf(this.cpf)) {
      alert('Por favor, insira um CPF válido.');
      return;
    }

    const novoUsuario = {
      codigo: 'USR' + Date.now(),
      tipoPessoa: this.tipoPessoa,
      cpf: this.cpf,
      nome: this.nome,
      nomeFantasia: this.nomeFantasia,
      cep: this.cep,
      endereco: this.endereco,
      bairro: this.bairro,
      cidade: this.cidade,
      telefone: this.telefone,
      email: this.email,
    };

    this.usuarioService.adicionarUsuario(novoUsuario);

    alert('Usuário cadastrado com sucesso!');
    this.router.navigate(['/']);
  }

  formatarTelefone() {
    let telefone = this.telefone;
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    this.telefone = telefone;
  }

  formatarCpf() {
    let cpf = this.cpf;
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere um hífen entre o terceiro e o quarto dígitos
    this.cpf = cpf;
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
