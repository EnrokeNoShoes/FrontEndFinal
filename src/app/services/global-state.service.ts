import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private codSucursalSubject = new BehaviorSubject<number | null>(null);
  private numSucursalSubject = new BehaviorSubject<string | null>(null);

  codsuc$ = this.codSucursalSubject.asObservable();
  numsuc$ = this.numSucursalSubject.asObservable();

  setCodSucursal(codsuc: number) {
    this.codSucursalSubject.next(codsuc);
  }

  setNumSucursal(numsuc: string) {
    this.numSucursalSubject.next(numsuc);
  }
}
