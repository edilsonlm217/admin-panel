import { TestBed } from "@angular/core/testing";
import { Tenant } from "../models/Tenant";
import { TenantService } from "./tenant.service";

fdescribe('TenantService', () => {
  let service: TenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantService]
    });
    service = TestBed.inject(TenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set tenants', () => {
    const tenants: Tenant[] = [
      {
        id: '1',
        cnpj: '123456789',
        responsavel: 'John Doe',
        contato: 'john.doe@example.com',
        provedor: {
          nome: 'Example Provider'
        },
        database: {
          conectado: true
        },
        assinatura: {
          ativa: true,
          valor: 100,
          data_vencimento: new Date(),
          dia_vencimento: '10'
        }
      }
    ];
    service.setTenants(tenants);
    expect(service.tenants).toEqual(tenants);
  });

  it('should return tenant by id', () => {
    const tenants: Tenant[] = [
      {
        id: '1',
        cnpj: '123456789',
        responsavel: 'John Doe',
        contato: 'john.doe@example.com',
        provedor: {
          nome: 'Example Provider'
        },
        database: {
          conectado: true
        },
        assinatura: {
          ativa: true,
          valor: 100,
          data_vencimento: new Date(),
          dia_vencimento: '10'
        }
      }
    ];
    service.setTenants(tenants);
    const tenant = service.getTenantById('1');
    expect(tenant).toEqual(tenants[0]);
  });

  it('should return null when id is empty', () => {
    const tenant = service.getTenantById('');
    expect(tenant).toBeNull();
  });

  it('should return null when id is not found', () => {
    const tenants: Tenant[] = [
      {
        id: '1',
        cnpj: '123456789',
        responsavel: 'John Doe',
        contato: 'john.doe@example.com',
        provedor: {
          nome: 'Example Provider'
        },
        database: {
          conectado: true
        },
        assinatura: {
          ativa: true,
          valor: 100,
          data_vencimento: new Date(),
          dia_vencimento: '10'
        }
      }
    ];
    service.setTenants(tenants);
    const tenant = service.getTenantById('2');
    expect(tenant).toBeNull();
  });
});