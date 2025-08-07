import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterChildComponent } from './newsletter-child.component';

describe('NewsletterChildComponent', () => {
  let component: NewsletterChildComponent;
  let fixture: ComponentFixture<NewsletterChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
