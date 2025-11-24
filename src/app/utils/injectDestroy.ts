import { DestroyRef, inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * Creates a ReplaySubject that emits a value and completes when the component or directive is destroyed.
 * @returns A ReplaySubject that emits on destroy.
 */
export function injectDestroy(): ReplaySubject<void> {
  const destroyRef = inject(DestroyRef);
  const subject = new ReplaySubject<void>(1);

  destroyRef.onDestroy(() => {
    subject.next();
    subject.complete();
  });

  return subject;
}
