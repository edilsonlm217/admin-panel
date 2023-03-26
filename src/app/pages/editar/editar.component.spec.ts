import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { TenantService } from "src/app/services/tenant.service";
import { EditarFormComponent } from "./editar-form/editar-form.component";
import { EditarComponent } from "./editar.component";

fdescribe('EditarComponent', () => {
  let component: EditarComponent;
  let fixture: ComponentFixture<EditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditarComponent,
        EditarFormComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({ tenantId: 'testId' }) } },
        { provide: ApiService, useValue: {} },
        { provide: TenantService, useValue: {} },
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tenantId when setTenantId is called', () => {
    component.setTenantId('testId');
    expect(component.tenantId).toEqual('testId');
  });

  it('should set tenantId when queryParams have tenantId', () => {
    expect(component.tenantId).toEqual('testId');
  });
});
