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
      this.formUtilsService.focusMissingField(ngForm);
      return;
    }

    try {
      const form = this.cadastrarForm;
      const response = await this.api.cadastrarTenant({
        cnpj: form.cnpj,
        responsavel: form.responsavel,
        contato: form.contato,
        provedor: { nome: form.provedorNome },
        database: {
          name: form.databaseName,
          dialect: form.databaseDialect,
          host: form.databaseHost,
          username: form.databaseUsername,
          password: form.databasePassword,
        },
        assinatura: {
          valor: Number(form.assinaturaValor),
          data_vencimento: form.assinaturaDataVencimento,
          dia_vencimento: form.assinaturaDiaVencimento,
        }
      });
      this.tenantService.tenants.push(response);
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
