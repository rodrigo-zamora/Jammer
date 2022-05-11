import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateListComponent } from './dialog-create-list.component';

describe('DialogCreateListComponent', () => {
  let component: DialogCreateListComponent;
  let fixture: ComponentFixture<DialogCreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
