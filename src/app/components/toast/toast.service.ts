import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { TOAST_DATA, ToastData } from '@components/toast/toast-config';
import { ToastRef } from '@components/toast/toast-ref';
import { ToastComponent } from '@components/toast/toast.component';
import { from, interval, zip } from 'rxjs';

// The following service and toast implementation are based on https://adrianfaciu.dev/posts/angular-toast-service/

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _overlay = inject(Overlay);
  private readonly _parentInjector = inject(Injector);

  private _lastToast?: ToastRef;

  showMultiple(data: ToastData[]): void {
    void zip(from(data), interval(100)).forEach(([data]) => this.show(data));
  }

  show(data: ToastData): ToastRef {
    const positionStrategy = this._getPositionStrategy();
    const overlayRef = this._overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    this._lastToast = toastRef;

    const injector = this._getInjector(data, toastRef, this._parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlay.position().global().top(this._getPosition()).right(coerceCssPixelValue(20));
  }

  private _getPosition(): string {
    const isLastToastIsVisible = !!this._lastToast?.isVisible();
    const position = isLastToastIsVisible && this._lastToast ? this._lastToast.getPosition().bottom : 20;

    return coerceCssPixelValue(position);
  }

  private _getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector): Injector {
    return Injector.create({
      parent: parentInjector,
      providers: [
        { provide: ToastRef, useValue: toastRef },
        { provide: TOAST_DATA, useValue: data },
      ],
    });
  }
}
