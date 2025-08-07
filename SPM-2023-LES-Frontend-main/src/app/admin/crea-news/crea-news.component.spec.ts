import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaNewsComponent } from './crea-news.component';

describe('CreaNewsComponent', () => {
  let component: CreaNewsComponent;
  let fixture: ComponentFixture<CreaNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
