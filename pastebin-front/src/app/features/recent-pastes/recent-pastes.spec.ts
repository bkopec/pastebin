import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPastesComponent } from './recent-pastes';

describe('RecentPastes', () => {
  let component: RecentPastesComponent;
  let fixture: ComponentFixture<RecentPastesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPastesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPastesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
