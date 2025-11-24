/**
 * Checks if the provided value is an array.
 * @param value The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}
