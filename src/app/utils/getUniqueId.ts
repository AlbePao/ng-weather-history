import { _IdGenerator } from '@angular/cdk/a11y';
import { inject } from '@angular/core';

/**
 * Generates a unique ID using Angular's _IdGenerator service.
 * @param id The base ID to generate a unique ID from.
 * @returns A unique ID string.
 */
export function getUniqueId(id: string): string {
  return inject(_IdGenerator).getId(id);
}
