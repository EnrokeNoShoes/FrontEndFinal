import { DecimalPipe } from "@angular/common";

export interface TipoIva{
    codIva:number,
    numIva:string,
    desIva:string,
    coheficiente:DecimalPipe,
    codUsuario:number,
    codEmpresa:number
}