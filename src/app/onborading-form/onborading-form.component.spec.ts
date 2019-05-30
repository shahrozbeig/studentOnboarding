import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboradingFormComponent } from './onborading-form.component';

describe('OnboradingFormComponent', () => {
  let component: OnboradingFormComponent;
  let fixture: ComponentFixture<OnboradingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboradingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboradingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
