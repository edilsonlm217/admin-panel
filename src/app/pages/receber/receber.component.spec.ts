import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReceberComponent } from './receber.component';
import { RecebimentoFormComponent } from './recebimento-form/recebimento-form.component';

describe('ReceberComponent', () => {
  let component: ReceberComponent;
  let fixture: ComponentFixture<ReceberComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceberComponent, RecebimentoFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({ tenantId: 'testId' }) } },
      ],
      imports: [HttpClientTestingModule, FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
