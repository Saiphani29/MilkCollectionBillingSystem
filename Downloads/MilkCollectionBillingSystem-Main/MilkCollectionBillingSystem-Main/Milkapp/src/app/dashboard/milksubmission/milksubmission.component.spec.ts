import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilksubmissionComponent } from './milksubmission.component';

describe('MilksubmissionComponent', () => {
  let component: MilksubmissionComponent;
  let fixture: ComponentFixture<MilksubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilksubmissionComponent]
    });
    fixture = TestBed.createComponent(MilksubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
