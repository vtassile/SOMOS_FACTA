import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguraConfiguraComponent } from './configura.component';

describe('ConfiguraComponent', () => {
  let component: ConfiguraConfiguraComponent;
  let fixture: ComponentFixture<ConfiguraConfiguraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguraConfiguraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguraConfiguraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
