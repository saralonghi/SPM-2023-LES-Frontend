import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCreaNewsletterComponent } from './p-crea-newsletter.component';

describe('PCreaNewsletterComponent', () => {
  let component: PCreaNewsletterComponent;
  let fixture: ComponentFixture<PCreaNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCreaNewsletterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCreaNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
