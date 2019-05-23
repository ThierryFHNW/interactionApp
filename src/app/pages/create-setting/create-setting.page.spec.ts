import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSettingPage } from './create-setting.page';

describe('CreateSettingPage', () => {
  let component: CreateSettingPage;
  let fixture: ComponentFixture<CreateSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
