import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StefanComponent } from './stefan.component';

describe('StefanComponent', () => {
  let component: StefanComponent;
  let fixture: ComponentFixture<StefanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StefanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StefanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
