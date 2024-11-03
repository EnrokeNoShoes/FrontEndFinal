import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private codEmpresaSubject = new BehaviorSubject<number | null>(null);
  private razonsocialSubject = new BehaviorSubject<string | null>(null);

  codemp$ = this.codEmpresaSubject.asObservable();
  razonsocial$ = this.razonsocialSubject.asObservable();

  setCodEmpresa(codemp: number) {
    this.codEmpresaSubject.next(codemp);
  }

  setRazonsocial(nombre: string) {
    this.razonsocialSubject.next(nombre);
  }
}
