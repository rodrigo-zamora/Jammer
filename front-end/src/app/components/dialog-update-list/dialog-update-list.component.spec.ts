import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateListComponent } from './dialog-update-list.component';

describe('DialogUpdateListComponent', () => {
  let component: DialogUpdateListComponent;
  let fixture: ComponentFixture<DialogUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
