import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerregisterComponent } from './sellerregister.component';

describe('SellerregisterComponent', () => {
  let component: SellerregisterComponent;
  let fixture: ComponentFixture<SellerregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerregisterComponent]
    });
    fixture = TestBed.createComponent(SellerregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
