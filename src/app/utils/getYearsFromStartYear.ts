/**
 * Generates an array of years from the specified start year up to the current year.
 * @param startYear The year to start generating from.
 * @returns An array of years from startYear to the current year.
 */
export function getYearsFromStartYear(startYear: number): number[] {
  const currentYear = new Date().getFullYear();

  if (currentYear < startYear) {
    // Prevent generating years if the start year is in the future
    return [];
  }

  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
}
