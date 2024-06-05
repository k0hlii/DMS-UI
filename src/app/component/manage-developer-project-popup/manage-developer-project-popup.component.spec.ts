import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeveloperProjectPopupComponent } from './manage-developer-project-popup.component';

describe('ManageDeveloperProjectPopupComponent', () => {
  let component: ManageDeveloperProjectPopupComponent;
  let fixture: ComponentFixture<ManageDeveloperProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDeveloperProjectPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDeveloperProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
