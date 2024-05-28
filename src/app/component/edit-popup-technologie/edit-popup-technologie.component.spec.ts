import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPopupTechnologieComponent } from './edit-popup-technologie.component';

describe('EditPopupTechnologieComponent', () => {
  let component: EditPopupTechnologieComponent;
  let fixture: ComponentFixture<EditPopupTechnologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPopupTechnologieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPopupTechnologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
