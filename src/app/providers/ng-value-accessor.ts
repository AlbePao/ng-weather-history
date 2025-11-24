import { Provider, Type, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Provides a NG_VALUE_ACCESSOR for the given component or directive.
 * @param useExisting The component or directive to provide the NG_VALUE_ACCESSOR for.
 * @returns A provider for the NG_VALUE_ACCESSOR.
 */
export const provideNgValueAccessor = (useExisting: Type<unknown>): Provider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => useExisting),
  multi: true,
});
