import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerChildComponent } from './producer-child.component';

describe('ProducerChildComponent', () => {
  let component: ProducerChildComponent;
  let fixture: ComponentFixture<ProducerChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducerChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
