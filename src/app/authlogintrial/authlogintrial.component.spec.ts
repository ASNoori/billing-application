import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthlogintrialComponent } from './authlogintrial.component';

describe('AuthlogintrialComponent', () => {
  let component: AuthlogintrialComponent;
  let fixture: ComponentFixture<AuthlogintrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthlogintrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthlogintrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
