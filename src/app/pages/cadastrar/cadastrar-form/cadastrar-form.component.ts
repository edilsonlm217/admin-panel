import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormUtilsService } from 'src/app/services/form-utils.service';
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
    public formUtilsService: FormUtilsService
  ) { }

  ngOnInit(): void {
    this.cadastrarForm = new CadastrarForm();
  }

  async submitForm(ngForm: NgForm): Promise<void> {
    const isFormValid = this.formUtilsService.resolveIsFormValid(ngForm);

    if (!isFormValid) {
      this.formUtilsService.focusMissingField(ngForm.form.controls);
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
}
