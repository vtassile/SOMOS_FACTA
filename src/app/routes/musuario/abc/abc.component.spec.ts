import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusuarioAbcComponent } from './abc.component';

describe('AbcComponent', () => {
  let component: MusuarioAbcComponent;
  let fixture: ComponentFixture<MusuarioAbcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusuarioAbcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusuarioAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
