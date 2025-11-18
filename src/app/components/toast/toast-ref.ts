import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class ToastRef {
  private readonly _closed$ = new Subject<void>();

  closed = this._closed$.asObservable();

  constructor(private readonly _overlay: OverlayRef) {}

  close(): void {
    this._closed$.next();
    this._overlay.dispose();
  }

  isVisible(): boolean {
    return !!this._overlay && !!this._overlay.overlayElement;
  }

  getPosition(): DOMRect {
    return this._overlay.overlayElement.getBoundingClientRect();
  }
}
