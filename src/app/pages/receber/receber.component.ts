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
      if (tenant) { this.setTenant(tenant) }
    });

    this.cnpj = this.tenant.cnpj;
    this.valorPago = this.tenant.assinatura.valor;
    this.dataPagamento = this.resolveDataPagamento();
    this.proximoPagamento = '';

    console.log(this.cnpj);
    console.log(this.valorPago);
    console.log(this.dataPagamento);
    console.log(this.proximoPagamento);
  }

  setTenant(tenant: Tenant) {
    this.tenant = tenant;
  }

  getTenantIdFromQueryParams(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.route.queryParams.subscribe(
        (params: any) => { resolve(params.tenantId) },
        (error) => { reject(error) }
      );
    })
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
