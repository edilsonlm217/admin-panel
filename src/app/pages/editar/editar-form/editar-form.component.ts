import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailedTenant } from 'src/app/models/DetailedTenant';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { TenantService } from 'src/app/services/tenant.service';
import { EditarForm } from '../editar-model';

@Component({
  selector: 'app-editar-form',
  templateUrl: './editar-form.component.html',
  styleUrls: ['./editar-form.component.scss']
})
export class EditarFormComponent implements OnInit {
  @Input() tenantId!: string;

  editarForm!: EditarForm;
  tenant!: DetailedTenant;

  constructor(
    public api: ApiService,
    public tenantService: TenantService,
    public router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.editarForm = new EditarForm();

    try {
      const tenant = await this.api.fetchSingleTenant(this.tenantId);
      this.setTenant(tenant);
      this.preencherForm(this.tenant);
    } catch (error) {
      console.error(error);
    }
  }

  setTenant(tenant: DetailedTenant) {
    this.tenant = tenant;
  }

  async submitForm(ngForm: NgForm): Promise<void> {
    const isFormValid = this.resolveIsFormValid(ngForm);

    if (!isFormValid) {
      this.focusMissingField(ngForm.form.controls);
      return;
    }

    try {
      const tenant = this.buildTenantObj();
      const response = await this.api.atualizarTenantById(this.tenantId, tenant);
      this.tenantService.tenants.push(response);
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }

  buildTenantObj() {
    return {
      cnpj: this.editarForm.cnpj,
      responsavel: this.editarForm.responsavel,
      contato: this.editarForm.contato,
      provedor: { nome: this.editarForm.provedorNome },
      database: {
        name: this.editarForm.databaseName,
        dialect: this.editarForm.databaseDialect,
        host: this.editarForm.databaseHost,
        username: this.editarForm.databaseUsername,
        password: this.editarForm.databasePassword,
      },
      assinatura: {
        valor: Number(this.editarForm.assinaturaValor),
        data_vencimento: this.editarForm.assinaturaDataVencimento,
        dia_vencimento: this.editarForm.assinaturaDiaVencimento,
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

  preencherForm(tenant: DetailedTenant): void {
    this.editarForm.cnpj = tenant.cnpj;
    this.editarForm.responsavel = tenant.responsavel;
    this.editarForm.contato = tenant.contato;
    this.editarForm.provedorNome = tenant.provedor.nome;
    this.editarForm.databaseName = tenant.database.name;
    this.editarForm.databaseDialect = tenant.database.dialect;
    this.editarForm.databaseHost = tenant.database.host;
    this.editarForm.databaseUsername = tenant.database.username;
    this.editarForm.databasePassword = tenant.database.password;
    this.editarForm.assinaturaValor = tenant.assinatura.valor;
    this.editarForm.assinaturaDiaVencimento = tenant.assinatura.dia_vencimento;
    this.editarForm.assinaturaDataVencimento = format(
      parseISO(tenant.assinatura.data_vencimento.toString()),
      'yyyy-MM-dd'
    );
  }
}
