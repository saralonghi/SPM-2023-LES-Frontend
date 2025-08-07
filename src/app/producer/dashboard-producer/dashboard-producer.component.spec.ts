import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProducerComponent } from './dashboard-producer.component';

describe('DashboardProducerComponent', () => {
  let component: DashboardProducerComponent;
  let fixture: ComponentFixture<DashboardProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProducerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
