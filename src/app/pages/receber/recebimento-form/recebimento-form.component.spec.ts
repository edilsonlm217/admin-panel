import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebimentoFormComponent } from './recebimento-form.component';

describe('RecebimentoFormComponent', () => {
  let component: RecebimentoFormComponent;
  let fixture: ComponentFixture<RecebimentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecebimentoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecebimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
