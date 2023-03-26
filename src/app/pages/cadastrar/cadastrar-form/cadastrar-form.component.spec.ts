import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormUtilsService } from 'src/app/services/form-utils.service';
import { TenantService } from 'src/app/services/tenant.service';
import { FormsModule } from '@angular/forms';

import { CadastrarFormComponent } from './cadastrar-form.component';

describe('CadastrarFormComponent', () => {
  let component: CadastrarFormComponent;
  let fixture: ComponentFixture<CadastrarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        ApiService,
        TenantService,
        Router,
        FormUtilsService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cadastrarForm on ngOnInit', () => {
    expect(component.cadastrarForm).toBeDefined();
  });

  it('should call api.cadastrarTenant and navigate to "/" on submitForm when form is valid', async () => {
    const ngForm = {
      form: {
        controls: {},
        status: 'VALID',
        value: {
          'cnpj': '123456789',
          'responsavel': 'John Doe',
          'contato': 'johndoe@example.com',
          'provedor-nome': 'Example Provider',
          'database-nome': 'example_db',
          'database-dialect': 'mysql',
          'database-host': 'localhost',
          'database-user': 'root',
          'database-pwd': 'password',
          'assinatura-valor': '100',
          'assinatura-data-vencimento': '2022-01-01',
          'assinatura-dia-vencimento': '1'
        }
      },
    } as NgForm;

    spyOn(component.api, 'cadastrarTenant').and.returnValue(Promise.resolve({}));
    spyOn(component.tenantService.tenants, 'push');
    spyOn(component.router, 'navigate');

    await component.submitForm(ngForm);

    expect(component.api.cadastrarTenant).toHaveBeenCalledWith({
      cnpj: '123456789',
      responsavel: 'John Doe',
      contato: 'johndoe@example.com',
      provedor: { nome: 'Example Provider' },
      database: {
        name: 'example_db',
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
    expect(component.tenantService.tenants.push).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not call api.cadastrarTenant and not navigate to "/" on submitForm when form is invalid', async () => {
    const ngForm = {
      form: {
        controls: {},
        status: 'INVALID',
        value: {
          'cnpj': '123456789',
          'responsavel': 'John Doe',
          'contato': 'johndoe@example.com',
          'provedor-nome': 'Example Provider',
          'database-nome': 'example_db',
          'database-dialect': 'mysql',
          'database-host': 'localhost',
          'database-user': 'root',
          'database-pwd': 'password',
          'assinatura-valor': '100',
          'assinatura-data-vencimento': '2022-01-01',
          'assinatura-dia-vencimento': '1'
        }
      },
    } as NgForm;

    spyOn(component.api, 'cadastrarTenant');
    spyOn(component.tenantService.tenants, 'push');
    spyOn(component.router, 'navigate');

    await component.submitForm(ngForm);

    expect(component.api.cadastrarTenant).not.toHaveBeenCalled();
    expect(component.tenantService.tenants.push).not.toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });
});
