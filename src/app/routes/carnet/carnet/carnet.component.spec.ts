import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetCarnetComponent } from './carnet.component';

describe('CarnetComponent', () => {
  let component: CarnetCarnetComponent;
  let fixture: ComponentFixture<CarnetCarnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetCarnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
