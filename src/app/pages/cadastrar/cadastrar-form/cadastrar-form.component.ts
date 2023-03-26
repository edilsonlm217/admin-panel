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
      const response = await this.api.cadastrarTenant({
        cnpj: ngForm.form.value['cnpj'],
        responsavel: ngForm.form.value['responsavel'],
        contato: ngForm.form.value['contato'],
        provedor: { nome: ngForm.form.value['provedor-nome'] },
        database: {
          name: ngForm.form.value['database-nome'],
          dialect: ngForm.form.value['database-dialect'],
          host: ngForm.form.value['database-host'],
          username: ngForm.form.value['database-user'],
          password: ngForm.form.value['database-pwd'],
        },
        assinatura: {
          valor: Number(ngForm.form.value['assinatura-valor']),
          data_vencimento: ngForm.form.value['assinatura-data-vencimento'],
          dia_vencimento: ngForm.form.value['assinatura-dia-vencimento'],
        }
      });
      this.tenantService.tenants.push(response);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('CadastrarFormComponent: Failed to register new tenant');
    }
  }
}
