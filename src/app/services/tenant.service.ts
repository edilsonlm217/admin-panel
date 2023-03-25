import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tenant } from '../models/Tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public tenants!: Tenant[];

  constructor() { }

  setTenants(tenants: Tenant[]) {
    if (tenants) { this.tenants = tenants; }
  }

  getTenantById(id: string): Tenant | null {
    if (id && id !== '') {
      const [tenant] = this.tenants.filter(tenant => tenant.id === id);
      return tenant ? tenant : null;
    } else {
      return null;
    }
  }
}
