import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPages } from './settings-pages';

describe('SettingsPages', () => {
  let component: SettingsPages;
  let fixture: ComponentFixture<SettingsPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
