import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeboPage } from './nebo.page';

describe('NeboPage', () => {
  let component: NeboPage;
  let fixture: ComponentFixture<NeboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeboPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
