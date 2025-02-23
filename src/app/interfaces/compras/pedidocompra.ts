export interface MDetallePedidoCompra {
    codpedidocompra: number;
    codproducto: number;
    codigobarra: string;
    desproducto: string;
    cantidad: number;
    costoulitmo: number;
  }
  
  export interface MPedidoCompra {
    codpedidocompra: number;
    codsucursal: number;
    numsuc: string;
    dessuc: string;
    fechapedido: string;
    codcomprobante: number;
    numcomprobante: string;
    descomprobante: string;
    numcomprobantepc: string;
    codestado: number;
    numestado: string;
    desestado: string;
    codusu: number;
    nomusu: string;
    acciones: string;
    detalles: MDetallePedidoCompra[];
  }
  