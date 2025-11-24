/**
 * Capitalizes the first letter of a given string.
 * @param value - The input string to capitalize the first letter of.
 * @returns The input string with the first letter capitalized.
 */
export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
