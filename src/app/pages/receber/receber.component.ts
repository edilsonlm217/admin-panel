import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addMonths, format, parseISO, startOfDay } from 'date-fns';
import { Tenant } from 'src/app/models/Tenant';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-receber',
  templateUrl: './receber.component.html',
  styleUrls: ['./receber.component.scss']
})
export class ReceberComponent implements OnInit {
  tenant!: Tenant;

  cnpj: string = '';
  valorPago: number = 0;
  dataPagamento: string = '';
  proximoPagamento: string = '';

  constructor(
    private route: ActivatedRoute,
    private tenantService: TenantService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const tenantId = params['tenantId'];
      const tenant = this.tenantService.getTenantById(tenantId);
      if (tenant) {
        this.setTenant(tenant);
        this.cnpj = this.tenant.cnpj;
        this.valorPago = this.tenant.assinatura.valor;
        this.dataPagamento = this.resolveDataPagamento();
        this.proximoPagamento = '';
      }
    });
  }

  setTenant(tenant: Tenant) {
    this.tenant = tenant;
  }

  resolveProximoPagamento(vencimentoOriginal: string): string {
    return format(addMonths(parseISO(vencimentoOriginal), 1), 'yyyy-MM-dd');
  }

  resolveDataPagamento(): string {
    return format(startOfDay(new Date()).getTime(), 'yyyy-MM-dd');
  }

  getTenantFromHistoryState(): Tenant {
    return history.state;
  }
}
