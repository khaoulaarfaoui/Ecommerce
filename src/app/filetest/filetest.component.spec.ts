import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiletestComponent } from './filetest.component';

describe('FiletestComponent', () => {
  let component: FiletestComponent;
  let fixture: ComponentFixture<FiletestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiletestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiletestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
