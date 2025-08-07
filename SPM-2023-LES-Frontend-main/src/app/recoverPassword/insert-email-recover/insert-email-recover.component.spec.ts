import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEmailRecoverComponent } from './insert-email-recover.component';

describe('InsertEmailRecoverComponent', () => {
  let component: InsertEmailRecoverComponent;
  let fixture: ComponentFixture<InsertEmailRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertEmailRecoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertEmailRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
