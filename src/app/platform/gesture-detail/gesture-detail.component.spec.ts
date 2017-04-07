import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestureDetailComponent } from './gesture-detail.component';

describe('GestureDetailComponent', () => {
  let component: GestureDetailComponent;
  let fixture: ComponentFixture<GestureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
