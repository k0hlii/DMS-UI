import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPopupProjectComponent } from './edit-popup-project.component';

describe('EditPopupProjectComponent', () => {
  let component: EditPopupProjectComponent;
  let fixture: ComponentFixture<EditPopupProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPopupProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPopupProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
