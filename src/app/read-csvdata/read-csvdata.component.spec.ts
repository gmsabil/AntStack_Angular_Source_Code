import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCSVDataComponent } from './read-csvdata.component';

describe('ReadCSVDataComponent', () => {
  let component: ReadCSVDataComponent;
  let fixture: ComponentFixture<ReadCSVDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadCSVDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCSVDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
