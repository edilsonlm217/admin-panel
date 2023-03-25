import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceberComponent } from './receber.component';

describe('ReceberComponent', () => {
  let component: ReceberComponent;
  let fixture: ComponentFixture<ReceberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
