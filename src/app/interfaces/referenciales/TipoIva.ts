import { DecimalPipe } from "@angular/common";

export interface TipoIva {
    codIva: number;
    numiva: string;
    desiva: string;
    coheficiente: number; // Mantener como 'number'
    codUsuario: number;
}
