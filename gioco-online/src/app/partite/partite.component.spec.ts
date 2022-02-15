import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiteComponent } from './partite.component';

describe('PartiteComponent', () => {
  let component: PartiteComponent;
  let fixture: ComponentFixture<PartiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
