import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POtherImgComponent } from './p-other-img.component';

describe('POtherImgComponent', () => {
  let component: POtherImgComponent;
  let fixture: ComponentFixture<POtherImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POtherImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(POtherImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
