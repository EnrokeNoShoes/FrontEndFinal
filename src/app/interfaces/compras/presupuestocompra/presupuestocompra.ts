export interface MPresupuestoCompraDet {
    codpresupuestocompra: number;
    codproducto?: number;
    codigobarra?: string;
    desproducto?: string;
    cantidad?: number;
    preciocompra?: number;
    precioneto?: number;
    costo_anterior?: number;
    costoultimo?: number;
  }
  
  export interface MPresupuestoCompra {
    codpresupuestocompra: number;
    codproveedor?: number;
    numproveedor?: string;
    numdoc?: string;
    razonsocial?: string;
    codcomprobante?: number;
    numcomprobante?: string;
    descomprobante?: string;
    numpresupuestoc?: string;
    fechapresupuesto?: string;
    codsucursal?: number;
    numsuc?: string;
    dessucu?: string;
    codestado?: number;
    numestado?: string;
    desestado?: string;
    codmoneda?: number;
    nummoneda?: string;
    desmoneda?: string;
    codmodalidad?: number;
    nummodalidad?: string;
    desmodaliada?: string;
    cotizacion1?: number;
    cotizacion2?: number;
    totalexenta?: number;
    totalgravada?: number;
    totaliva?: number;
    totalpresupuesto?: number;
    totaldescuento?: number;  
    codusu?: number;
    nomusu?: string;
    acciones?: string;
    detalles?: MPresupuestoCompra[];
  }
  