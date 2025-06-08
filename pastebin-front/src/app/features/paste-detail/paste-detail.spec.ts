import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteDetailComponent } from './paste-detail';

describe('PasteDetail', () => {
  let component: PasteDetailComponent;
  let fixture: ComponentFixture<PasteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasteDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
