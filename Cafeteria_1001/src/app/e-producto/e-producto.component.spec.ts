import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EProductoComponent } from './e-producto.component';

describe('EProductoComponent', () => {
  let component: EProductoComponent;
  let fixture: ComponentFixture<EProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EProductoComponent]
    });
    fixture = TestBed.createComponent(EProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
