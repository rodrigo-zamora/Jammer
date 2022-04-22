import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalThemeComponent } from './global-theme.component';

describe('GlobalThemeComponent', () => {
  let component: GlobalThemeComponent;
  let fixture: ComponentFixture<GlobalThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
