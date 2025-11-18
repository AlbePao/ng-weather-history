import { _IdGenerator } from '@angular/cdk/a11y';
import { inject } from '@angular/core';

export function getUniqueId(id: string): string {
  return inject(_IdGenerator).getId(id);
}
