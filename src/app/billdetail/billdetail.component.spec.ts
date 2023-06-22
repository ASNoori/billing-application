import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilldetailComponent } from './billdetail.component';

describe('BilldetailComponent', () => {
  let component: BilldetailComponent;
  let fixture: ComponentFixture<BilldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilldetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
