import { Provider, Type, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const provideNgValueAccessor = (useExisting: Type<unknown>): Provider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => useExisting),
  multi: true,
});
