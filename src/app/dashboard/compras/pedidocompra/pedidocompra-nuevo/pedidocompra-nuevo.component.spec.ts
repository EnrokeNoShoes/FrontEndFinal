import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidocompraNuevoComponent } from './pedidocompra-nuevo.component';

describe('PedidocompraNuevoComponent', () => {
  let component: PedidocompraNuevoComponent;
  let fixture: ComponentFixture<PedidocompraNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidocompraNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidocompraNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
