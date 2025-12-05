import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanonTableDisplayComponent } from './canon-table-display-component';

describe('CanonTableDisplayComponent', () => {
  let component: CanonTableDisplayComponent;
  let fixture: ComponentFixture<CanonTableDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanonTableDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanonTableDisplayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
