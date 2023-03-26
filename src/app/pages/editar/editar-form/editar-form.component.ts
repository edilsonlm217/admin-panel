import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailedTenant } from 'src/app/models/DetailedTenant';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { TenantService } from 'src/app/services/tenant.service';
import { EditarForm } from '../editar-model';
import { FormUtilsService } from 'src/app/services/form-utils.service';

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
    public formUtilsService: FormUtilsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.editarForm = new EditarForm();

    try {
      const tenant = await this.api.fetchSingleTenant(this.tenantId);
      this.setTenant(tenant);
      this.preencherForm(this.tenant);
    } catch (error) {
      console.error('EditarFormComponent: Failed to fetch tenant');
    }
  }

  setTenant(tenant: DetailedTenant) {
    this.tenant = tenant;
  }

  async submitForm(ngForm: NgForm): Promise<void> {
    const isFormValid = this.formUtilsService.resolveIsFormValid(ngForm);

    if (!isFormValid) {
      this.formUtilsService.focusMissingField(ngForm);
      return;
    }

    try {
      const response = await this.api.atualizarTenantById(this.tenantId, {
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
      console.error('EditarFormComponent: Failed to update tenant');
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
