import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NProductoComponent } from './n-producto.component';

describe('NProductoComponent', () => {
  let component: NProductoComponent;
  let fixture: ComponentFixture<NProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NProductoComponent]
    });
    fixture = TestBed.createComponent(NProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
