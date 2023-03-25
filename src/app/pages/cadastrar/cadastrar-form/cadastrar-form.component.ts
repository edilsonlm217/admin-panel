import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TenantService } from 'src/app/services/tenant.service';
import { CadastrarForm } from '../cadastrar-model';

@Component({
  selector: 'app-cadastrar-form',
  templateUrl: './cadastrar-form.component.html',
  styleUrls: ['./cadastrar-form.component.scss']
})
export class CadastrarFormComponent implements OnInit {
  cadastrarForm!: CadastrarForm;

  constructor(
    public api: ApiService,
    public tenantService: TenantService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.cadastrarForm = new CadastrarForm();
  }

  async submitForm(ngForm: NgForm): Promise<void> {
    const isFormValid = this.resolveIsFormValid(ngForm);

    if (!isFormValid) {
      this.focusMissingField(ngForm.form.controls);
      return;
    }

    try {
      const tenant = this.buildTenantObj();
      const response = await this.api.cadastrarTenant(tenant);
      this.tenantService.tenants.push(response);
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }

  buildTenantObj() {
    return {
      cnpj: this.cadastrarForm.cnpj,
      responsavel: this.cadastrarForm.responsavel,
      contato: this.cadastrarForm.contato,
      provedor: { nome: this.cadastrarForm.provedorNome },
      database: {
        name: this.cadastrarForm.databaseName,
        dialect: this.cadastrarForm.databaseDialect,
        host: this.cadastrarForm.databaseHost,
        username: this.cadastrarForm.databaseUsername,
        password: this.cadastrarForm.databasePassword,
      },
      assinatura: {
        valor: Number(this.cadastrarForm.assinaturaValor),
        data_vencimento: this.cadastrarForm.assinaturaDataVencimento,
        dia_vencimento: this.cadastrarForm.assinaturaDiaVencimento,
      }
    };
  }

  resolveIsFormValid(ngForm: NgForm): boolean {
    return ngForm.form.status === 'VALID';
  }

  focusMissingField(controls: any): void {
    try {
      for (const name in controls) {
        if (controls[name].invalid) {
          const element = document.getElementById(name);
          if (element) { element.focus() }
        }
      }
    } catch (error) {
      console.error(error);
    }

    this.blurAllField(controls);
  }

  blurAllField(controls: any): void {
    try {
      for (const name in controls) {
        if (controls[name]) {
          const element = document.getElementById(name);
          if (element) { element.blur() }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
