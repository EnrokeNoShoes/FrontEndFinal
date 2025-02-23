import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidocompraVerComponent } from './pedidocompra-ver.component';

describe('PedidocompraVerComponent', () => {
  let component: PedidocompraVerComponent;
  let fixture: ComponentFixture<PedidocompraVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidocompraVerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidocompraVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
