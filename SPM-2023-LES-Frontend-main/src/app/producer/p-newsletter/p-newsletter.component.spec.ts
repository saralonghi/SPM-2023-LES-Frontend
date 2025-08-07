import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNewsletterComponent } from './p-newsletter.component';

describe('PNewsletterComponent', () => {
  let component: PNewsletterComponent;
  let fixture: ComponentFixture<PNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNewsletterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
