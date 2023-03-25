import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Tenant } from 'src/app/models/Tenant';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss']
})
export class SubscriptionCardComponent {
  @Input() tenant!: Tenant;

  constructor(
    public api: ApiService,
    public router: Router,
  ) { }

  async toggleIsActive(): Promise<void> {
    try {
      const updatedTenant = await this.api.toggleIsActive(this.tenant.cnpj);
      this.tenant = updatedTenant;
    } catch (error) {
      console.error(error);
    }
  }

  async connectOnClick(): Promise<void> {
    try {
      this.tenant = await this.api.connectDatabase(this.tenant.cnpj);
    } catch (error) {
      console.error(error);
    }
  }

  wppOnClick(): void {
    window.open('https://whatsa.me/5592991424261', '_blank');
  }

  handleRecebimento(): void {
    this.router.navigate(['/receber'], {
      queryParams: {
        tenantId: this.tenant.id
      }
    });
  }

  handleEditing(): void {
    this.router.navigate(['/editar'], {
      queryParams: {
        tenantId: this.tenant.id
      }
    });
  }
}
