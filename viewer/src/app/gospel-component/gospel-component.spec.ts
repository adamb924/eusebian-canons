import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GospelComponent } from './gospel-component';

describe('GospelComponent', () => {
  let component: GospelComponent;
  let fixture: ComponentFixture<GospelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GospelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GospelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
