import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarareaComponent } from './navbararea.component';

describe('NavbarareaComponent', () => {
  let component: NavbarareaComponent;
  let fixture: ComponentFixture<NavbarareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
