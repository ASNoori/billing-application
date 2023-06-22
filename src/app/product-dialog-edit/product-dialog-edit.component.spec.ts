import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDialogEditComponent } from './product-dialog-edit.component';

describe('ProductDialogEditComponent', () => {
  let component: ProductDialogEditComponent;
  let fixture: ComponentFixture<ProductDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDialogEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
