import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdetailComponent } from './salesdetail.component';

describe('SalesdetailComponent', () => {
  let component: SalesdetailComponent;
  let fixture: ComponentFixture<SalesdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
