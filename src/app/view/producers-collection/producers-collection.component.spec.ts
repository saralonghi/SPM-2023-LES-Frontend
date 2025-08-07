import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersCollectionComponent } from './producers-collection.component';

describe('ProducersCollectionComponent', () => {
  let component: ProducersCollectionComponent;
  let fixture: ComponentFixture<ProducersCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducersCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
