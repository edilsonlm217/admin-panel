import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DetailedTenant } from "src/app/models/DetailedTenant";
import { ApiService } from "src/app/services/api.service";
import { FormUtilsService } from "src/app/services/form-utils.service";
import { TenantService } from "src/app/services/tenant.service";
import { EditarFormComponent } from "./editar-form.component";

describe('EditarFormComponent', () => {
  let component: EditarFormComponent;
  let fixture: ComponentFixture<EditarFormComponent>;
  let apiService: ApiService;
  let tenantService: TenantService;
  let router: Router;
  let formUtilsService: FormUtilsService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarFormComponent],
      providers: [
        ApiService,
        TenantService,
        Router,
        FormUtilsService
      ],
      imports: [HttpClientTestingModule, FormsModule]
    })
      .compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFormComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    tenantService = TestBed.inject(TenantService);
    router = TestBed.inject(Router);
    formUtilsService = TestBed.inject(FormUtilsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set editarForm and tenant', async () => {
      const tenantId = '123';
      const tenant = { id: tenantId } as DetailedTenant;
      spyOn(apiService, 'fetchSingleTenant').and.returnValue(Promise.resolve(tenant));
      await component.ngOnInit();
      expect(component.editarForm).toBeDefined();
      expect(component.tenant).toEqual(tenant);
    });

    it('should log error when failed to fetch tenant', async () => {
      spyOn(apiService, 'fetchSingleTenant').and.returnValue(Promise.reject());
      spyOn(console, 'error');
      await component.ngOnInit();
      expect(console.error).toHaveBeenCalledWith('EditarFormComponent: Failed to fetch tenant');
    });
  });

  describe('setTenant', () => {
    it('should set tenant', () => {
      const tenant = { id: '123' } as DetailedTenant;
      component.setTenant(tenant);
      expect(component.tenant).toEqual(tenant);
    });
  });

  describe('submitForm', () => {
    let ngForm: NgForm;

    beforeEach(() => {
      ngForm = { form: { value: {} } } as NgForm;
    });

    it('should do nothing when form is invalid', async () => {
      spyOn(formUtilsService, 'resolveIsFormValid').and.returnValue(false);
      spyOn(formUtilsService, 'focusMissingField');
      spyOn(apiService, 'atualizarTenantById');
      spyOn(tenantService.tenants, 'push');
      spyOn(router, 'navigate');
      await component.submitForm(ngForm);
      expect(formUtilsService.focusMissingField).toHaveBeenCalledWith(ngForm);
      expect(apiService.atualizarTenantById).not.toHaveBeenCalled();
      expect(tenantService.tenants.push).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should update tenant and navigate to home page', async () => {
      const tenantId = '123';
      const tenant = { id: tenantId } as DetailedTenant;
      const response = { id: tenantId } as DetailedTenant;
      spyOn(formUtilsService, 'resolveIsFormValid').and.returnValue(true);
      spyOn(formUtilsService, 'focusMissingField');
      spyOn(apiService, 'atualizarTenantById').and.returnValue(Promise.resolve(response));
      spyOn(tenantService.tenants, 'push');
      spyOn(router, 'navigate');
      component.tenantId = tenantId;
      ngForm.form.value['cnpj'] = '123456789';
      ngForm.form.value['responsavel'] = 'John Doe';
      ngForm.form.value['contato'] = 'john.doe@example.com';
      ngForm.form.value['provedor-nome'] = 'Provider';
      ngForm.form.value['database-nome'] = 'Database';
      ngForm.form.value['database-dialect'] = 'mysql';
      ngForm.form.value['database-host'] = 'localhost';
      ngForm.form.value['database-user'] = 'root';
      ngForm.form.value['database-pwd'] = 'password';
      ngForm.form.value['assinatura-valor'] = '100';
      ngForm.form.value['assinatura-data-vencimento'] = '2022-01-01';
      ngForm.form.value['assinatura-dia-vencimento'] = '1';
      await component.submitForm(ngForm);
      expect(apiService.atualizarTenantById).toHaveBeenCalledWith(tenantId, {
        cnpj: '123456789',
        responsavel: 'John Doe',
        contato: 'john.doe@example.com',
        provedor: { nome: 'Provider' },
        database: {
          name: 'Database',
          dialect: 'mysql',
          host: 'localhost',
          username: 'root',
          password: 'password',
        },
        assinatura: {
          valor: 100,
          data_vencimento: '2022-01-01',
          dia_vencimento: '1',
        }
      });
      expect(tenantService.tenants.push).toHaveBeenCalledWith(response);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should log error when failed to update tenant', async () => {
      spyOn(formUtilsService, 'resolveIsFormValid').and.returnValue(true);
      spyOn(formUtilsService, 'focusMissingField');
      spyOn(apiService, 'atualizarTenantById').and.returnValue(Promise.reject());
      spyOn(console, 'error');
      await component.submitForm(ngForm);
      expect(console.error).toHaveBeenCalledWith('EditarFormComponent: Failed to update tenant');
    });
  });
});
