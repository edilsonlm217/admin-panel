import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tenant } from '../models/Tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  public tenants!: Tenant[];

  constructor() { }

  /**
   * Sets the tenants array to the provided array of Tenant objects.
   *
   * @param tenants An array of Tenant objects to set as the new tenants array.
   */
  setTenants(tenants: Tenant[]) {
    if (tenants) { this.tenants = tenants; }
  }

  /**
   * Retrieves a tenant object by its ID.
   * @param id - The ID of the tenant to retrieve.
   * @returns The tenant object if found, otherwise null.
   */
  getTenantById(id: string): Tenant | null {
    if (id && id !== '') {
      const [tenant] = this.tenants.filter(tenant => tenant.id === id);
      return tenant ? tenant : null;
    } else {
      return null;
    }
  }
}
