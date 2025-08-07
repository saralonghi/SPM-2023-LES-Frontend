import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewsletterHistoryComponent } from './p-newsletter-history.component';

describe('PNewsletterHistoryComponent', () => {
  let component: PNewsletterHistoryComponent;
  let fixture: ComponentFixture<PNewsletterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNewsletterHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PNewsletterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
