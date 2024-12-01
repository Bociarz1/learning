import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular19Component } from './angular-19.component';

describe('Angular19Component', () => {
  let component: Angular19Component;
  let fixture: ComponentFixture<Angular19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular19Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Angular19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
