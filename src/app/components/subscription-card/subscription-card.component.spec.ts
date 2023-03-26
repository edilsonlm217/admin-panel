import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { Tenant } from "src/app/models/Tenant";
import { ApiService } from "src/app/services/api.service";
import { SubscriptionCardComponent } from "./subscription-card.component";

describe('SubscriptionCardComponent', () => {
  let component: SubscriptionCardComponent;
  let fixture: ComponentFixture<SubscriptionCardComponent>;
  let apiService: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionCardComponent],
      providers: [
        ApiService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      imports: [
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCardComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ativarDesativarTenant', () => {
    beforeEach(() => {
      const originalTenant: Tenant = {
        id: '1',
        cnpj: '01234567890',
        contato: '92912345678',
        responsavel: 'John Doe',
        provedor: { nome: 'Test Telecom' },
        assinatura: {
          ativa: true,
          data_vencimento: new Date(),
          dia_vencimento: '05',
          valor: 100,
        },
        database: {
          conectado: true
        }
      }

      component['tenant'] = originalTenant;
    });

    it('should call api.toggleIsActive and update tenant', async () => {
      const updatedTenant: Tenant = {
        id: '1',
        cnpj: '01234567890',
        contato: '92912345678',
        responsavel: 'John Doe',
        provedor: { nome: 'Test Telecomm' },
        assinatura: {
          ativa: true,
          data_vencimento: new Date(),
          dia_vencimento: '05',
          valor: 100,
        },
        database: {
          conectado: true
        }
      };
      spyOn(apiService, 'toggleIsActive').and.returnValue(Promise.resolve(updatedTenant));

      await component.ativarDesativarTenant();

      expect(apiService.toggleIsActive).toHaveBeenCalledWith(component.tenant.cnpj);
      expect(component.tenant).toEqual(updatedTenant);
    });

    it('should log error when api.toggleIsActive throws an error', async () => {
      const error = 'SubscriptionCardComponent: Failed to "ativar" ou "desativar" tenant';
      spyOn(apiService, 'toggleIsActive').and.throwError(error);

      spyOn(console, 'error');

      await component.ativarDesativarTenant();

      expect(apiService.toggleIsActive).toHaveBeenCalledWith(component.tenant.cnpj);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('conectarDatabase', () => {
    beforeEach(() => {
      const originalTenant: Tenant = {
        id: '1',
        cnpj: '01234567890',
        contato: '92912345678',
        responsavel: 'John Doe',
        provedor: { nome: 'Test Telecom' },
        assinatura: {
          ativa: true,
          data_vencimento: new Date(),
          dia_vencimento: '05',
          valor: 100,
        },
        database: {
          conectado: true
        }
      }

      component['tenant'] = originalTenant;
    });

    it('should call api.connectDatabase and update tenant', async () => {
      const updatedTenant = { ...component.tenant, database: { ...component.tenant.database, conectado: true } };
      spyOn(apiService, 'connectDatabase').and.returnValue(Promise.resolve(updatedTenant));

      await component.conectarDatabase();

      expect(apiService.connectDatabase).toHaveBeenCalledWith(component.tenant.cnpj);
      expect(component.tenant).toEqual(updatedTenant);
    });

    it('should log error when api.connectDatabase throws an error', async () => {
      const error = 'SubscriptionCardComponent: Failed to connect to database';
      spyOn(apiService, 'connectDatabase').and.throwError(error);

      spyOn(console, 'error');

      await component.conectarDatabase();

      expect(apiService.connectDatabase).toHaveBeenCalledWith(component.tenant.cnpj);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe('abrirWhatsapp', () => {
    beforeEach(() => {
      const originalTenant: Tenant = {
        id: '1',
        cnpj: '01234567890',
        contato: '92912345678',
        responsavel: 'John Doe',
        provedor: { nome: 'Test Telecom' },
        assinatura: {
          ativa: true,
          data_vencimento: new Date(),
          dia_vencimento: '05',
          valor: 100,
        },
        database: {
          conectado: true
        }
      }

      component['tenant'] = originalTenant;
    });

    it('should open whatsapp window with tenant contact', () => {
      spyOn(window, 'open');

      component.abrirWhatsapp();

      expect(window.open).toHaveBeenCalledWith(`https://whatsa.me/${component.tenant.contato}`, '_blank');
    });
  });

  describe('navegarParaRecebimento', () => {
    beforeEach(() => {
      const originalTenant: Tenant = {
        id: '1',
        cnpj: '01234567890',
        contato: '92912345678',
        responsavel: 'John Doe',
        provedor: { nome: 'Test Telecom' },
        assinatura: {
          ativa: true,
          data_vencimento: new Date(),
          dia_vencimento: '05',
          valor: 100,
        },
        database: {
          conectado: true
        }
      }

      component['tenant'] = originalTenant;
    });

    it('should navigate to /receber with tenantId query param', () => {
      component.navegarParaRecebimento();

      expect(router.navigate).toHaveBeenCalledWith(['/receber'], { queryParams: { tenantId: component.tenant.id } });
    });
  });

  describe('navegarParaEdicao', () => {
    beforeEach(() => {
      const originalTenant: Tenant = {
        id: '1',
        cnpj: '01234567890',
        contato: '92912345678',
        responsavel: 'John Doe',
        provedor: { nome: 'Test Telecom' },
        assinatura: {
          ativa: true,
          data_vencimento: new Date(),
          dia_vencimento: '05',
          valor: 100,
        },
        database: {
          conectado: true
        }
      }

      component['tenant'] = originalTenant;
    });

    it('should navigate to /editar with tenantId query param', () => {
      component.navegarParaEdicao();
      expect(router.navigate).toHaveBeenCalledWith(['/editar'], { queryParams: { tenantId: component.tenant.id } });
    });
  });
});
