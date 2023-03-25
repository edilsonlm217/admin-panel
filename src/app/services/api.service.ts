import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedTenant } from '../models/DetailedTenant';
import { Tenant } from '../models/Tenant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: string = 'http://177.53.237.90:3336';

  constructor(
    public http: HttpClient,
  ) { }

  /**
   * fetchTenants function retrieves a list of tenants from the API endpoint.
   * @returns Promise<Tenant[]> A promise that resolves with an array of Tenant objects.
   */
  fetchTenants(): Promise<Tenant[]> {
    return new Promise<Tenant[]>((resolve, reject) => {
      console.log(`${this.api}/providers`);
      const url = `${this.api}/providers`;
      this.http.get(url, { responseType: 'json' }).subscribe(
        (tenants: any) => { resolve(tenants) },
        error => { reject(error) }
      );
    });
  }

  /**
   * Toggles the isActive status of a given tenant by CNPJ in the API's subscription endpoint.
   * @param cnpj The CNPJ to toggle the isActive status for.
   * @returns A Promise that resolves with the updated tenant object or rejects with an error.
   */
  toggleIsActive(cnpj: string): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const url = `${this.api}/assinatura`;
      return this.http.post(url, { cnpj: cnpj }, { responseType: 'json' }).subscribe(
        (tenant: any) => { resolve(tenant) },
        error => { reject(error) }
      );
    });
  }

  /**
   * Connects to the database using the provided CNPJ.
   * @param cnpj The CNPJ to use for the connection.
   * @returns A Promise that resolves with the tenant object upon successful connection, or rejects with an error if the connection fails.
   */
  connectDatabase(cnpj: string): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const url = `${this.api}/connect`;
      return this.http.post(url, { cnpj: cnpj }, { responseType: 'json' }).subscribe(
        (tenant: any) => { resolve(tenant) },
        error => { reject(error) }
      );
    });
  }

  /**
   * Method to receive payment from the API.
   * @param body - The payment details to be sent to the API.
   * @returns A Promise that resolves with the payment details or rejects with an error.
   */
  receberPagamento(body: any): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const url = `${this.api}/payment`;
      return this.http.post(url, body, { responseType: 'json' }).subscribe(
        (tenant: any) => { resolve(tenant) },
        error => { reject(error) }
      );
    });
  }

  /**
   * Registers a new tenant with the provided data.
   * @param body - The data of the tenant to be registered.
   * @returns A Promise that resolves with the registered tenant data or rejects with an error.
   */
  cadastrarTenant(body: any): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const url = `${this.api}/provider`;
      return this.http.post(url, body, { responseType: 'json' }).subscribe(
        (tenant: any) => { resolve(tenant) },
        error => { reject(error) }
      );
    });
  }

  /**
   * Fetches a single tenant by ID and returns a Promise that resolves with a DetailedTenant object.
   * @param tenantId - The ID of the tenant to fetch.
   * @returns A Promise that resolves with a DetailedTenant object.
   */
  fetchSingleTenant(tenantId: string): Promise<DetailedTenant> {
    return new Promise<DetailedTenant>((resolve, reject) => {
      const url = `${this.api}/provider/${tenantId}`;
      return this.http.get(url, { responseType: 'json' }).subscribe(
        (tenant: any) => { resolve(tenant) },
        error => { reject(error) }
      );
    })
  }

  /**
   * Updates a tenant by ID.
   * @param {string} tenantId - The ID of the tenant to update.
   * @param {any} body - The updated tenant data.
   * @returns {Promise<any>} - A promise that resolves with the updated tenant data or rejects with an error.
   */
  atualizarTenantById(tenantId: string, body: any): Promise<Tenant> {
    return new Promise((resolve, reject) => {
      const url = `${this.api}/provider/${tenantId}`;
      this.http.put(url, body, { responseType: 'json' }).subscribe(
        (tenant: any) => { resolve(tenant) },
        error => { reject(error) }
      );
    })
  }
}
