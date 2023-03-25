import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFormComponent } from './cadastrar-form.component';

describe('InclusaoFormComponent', () => {
  let component: CadastrarFormComponent;
  let fixture: ComponentFixture<CadastrarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastrarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
