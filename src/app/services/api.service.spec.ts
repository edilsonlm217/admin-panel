import { TestBed } from "@angular/core/testing";
import { DetailedTenant } from "../models/DetailedTenant";
import { Tenant } from "../models/Tenant";
import { ApiService } from "./api.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tenants', () => {
    const mockTenants: Tenant[] = [
      {
        id: '1',
        cnpj: '12345678901234',
        responsavel: 'John Doe',
        contato: 'johndoe@example.com',
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

    service.fetchTenants().then((tenants: Tenant[]) => {
      expect(tenants).toEqual(mockTenants);
    });

    const req = httpMock.expectOne(`${service.api}/providers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTenants);
  });

  it('should toggle isActive status of a tenant', () => {
    const mockTenant: Tenant = {
      id: '1',
      cnpj: '12345678901234',
      responsavel: 'John Doe',
      contato: 'johndoe@example.com',
      provedor: {
        nome: 'Example Provider'
      },
      database: {
        conectado: true
      },
      assinatura: {
        ativa: false,
        valor: 100,
        data_vencimento: new Date(),
        dia_vencimento: '10'
      }
    };

    service.toggleIsActive(mockTenant.cnpj).then((tenant: Tenant) => {
      expect(tenant).toEqual(mockTenant);
    });

    const req = httpMock.expectOne(`${service.api}/assinatura`);
    expect(req.request.method).toBe('POST');
    req.flush(mockTenant);
  });

  it('should connect to database using a tenant CNPJ', () => {
    const mockTenant: Tenant = {
      id: '1',
      cnpj: '12345678901234',
      responsavel: 'John Doe',
      contato: 'johndoe@example.com',
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
    };

    service.connectDatabase(mockTenant.cnpj).then((tenant: Tenant) => {
      expect(tenant).toEqual(mockTenant);
    });

    const req = httpMock.expectOne(`${service.api}/connect`);
    expect(req.request.method).toBe('POST');
    req.flush(mockTenant);
  });

  it('should receive payment from the API', () => {
    const mockPayment = {
      cnpj: '12345678901234',
      valor: 100,
      data: new Date()
    };

    service.receberPagamento(mockPayment).then((payment: any) => {
      expect(payment).toEqual(mockPayment);
    });

    const req = httpMock.expectOne(`${service.api}/payment`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPayment);
  });

  it('should register a new tenant', () => {
    const mockTenant: Tenant = {
      id: '1',
      cnpj: '12345678901234',
      responsavel: 'John Doe',
      contato: 'johndoe@example.com',
      provedor: {
        nome: 'Example Provider'
      },
      database: {
        conectado: false
      },
      assinatura: {
        ativa: false,
        valor: 100,
        data_vencimento: new Date(),
        dia_vencimento: '10'
      }
    };

    service.cadastrarTenant(mockTenant).then((tenant: Tenant) => {
      expect(tenant).toEqual(mockTenant);
    });

    const req = httpMock.expectOne(`${service.api}/provider`);
    expect(req.request.method).toBe('POST');
    req.flush(mockTenant);
  });

  it('should fetch a single tenant by ID', () => {
    const mockTenant: DetailedTenant = {
      id: '1',
      cnpj: '12345678901234',
      responsavel: 'John Doe',
      contato: 'johndoe@example.com',
      provedor: {
        nome: 'Example Provider'
      },
      database: {
        conectado: true,
        name: 'example_db',
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'password'
      },
      assinatura: {
        ativa: true,
        valor: 100,
        data_vencimento: new Date(),
        dia_vencimento: '10'
      }
    };

    service.fetchSingleTenant(mockTenant.id).then((tenant: DetailedTenant) => {
      expect(tenant).toEqual(mockTenant);
    });

    const req = httpMock.expectOne(`${service.api}/provider/${mockTenant.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTenant);
  });

  it('should update a tenant by ID', () => {
    const mockTenant: Tenant = {
      id: '1',
      cnpj: '12345678901234',
      responsavel: 'John Doe',
      contato: 'johndoe@example.com',
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
    };

    const updatedTenant: Tenant = {
      id: '1',
      cnpj: '12345678901234',
      responsavel: 'Jane Doe',
      contato: 'janedoe@example.com',
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
    };

    service.atualizarTenantById(mockTenant.id, updatedTenant).then((tenant: Tenant) => {
      expect(tenant).toEqual(updatedTenant);
    });

    const req = httpMock.expectOne(`${service.api}/provider/${mockTenant.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTenant);
  });
});
