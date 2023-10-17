import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlReportesComponent } from './control-reportes.component';

describe('ControlReportesComponent', () => {
  let component: ControlReportesComponent;
  let fixture: ComponentFixture<ControlReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlReportesComponent]
    });
    fixture = TestBed.createComponent(ControlReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
