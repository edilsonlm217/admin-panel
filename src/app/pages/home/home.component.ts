import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tenant } from 'src/app/models/Tenant';
import { ApiService } from 'src/app/services/api.service';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tenantList!: Tenant[];

  constructor(
    public tenantService: TenantService,
    public api: ApiService,
    public router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.api.fetchTenants();
      this.setTenantList(response);
      this.tenantService.setTenants(response);
    } catch (error) {
      console.error('HomeComponent: Failed to fetch tenants from server', error);
    }
  }

  setTenantList(tenants: Tenant[]) {
    if (tenants) {
      this.tenantList = tenants;
    }
  }

  async cadastrarTenant(): Promise<void> {
    this.router.navigate(['/cadastrar']);
  }
}
