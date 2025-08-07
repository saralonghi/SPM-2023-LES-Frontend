import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerHistoryComponent } from './producer-history.component';

describe('ProducerHistoryComponent', () => {
  let component: ProducerHistoryComponent;
  let fixture: ComponentFixture<ProducerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
