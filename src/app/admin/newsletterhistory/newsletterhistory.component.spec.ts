import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterhistoryComponent } from './newsletterhistory.component';

describe('NewsletterhistoryComponent', () => {
  let component: NewsletterhistoryComponent;
  let fixture: ComponentFixture<NewsletterhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterhistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
