import { TimeRangesGranularity } from '@interfaces/time-ranges-granularity';

const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Parses an ISO UTC date string in the form "YYYY-MM-DD" into a Date object in UTC.
 *
 * The function performs basic validation:
 * - Splits the input by '-' and converts to numbers.
 * - Ensures there are exactly three numeric parts (year, month, day) and none are falsy.
 * - Returns a Date created via Date.UTC(year, month - 1, day) on success, otherwise null.
 * @param iso - A date string in the format "YYYY-MM-DD" (UTC).
 * @returns A Date object representing the given UTC date, or null if the input is invalid.
 */
const parseDateUTC = (iso: string): Date | null => {
  const parts = iso.split('-').map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) {
    return null;
  }

  const [y, m, d] = parts;

  if (!y || !m || !d) {
    return null;
  }

  return new Date(Date.UTC(y, m - 1, d));
};

/**
 * Formats a Date object as an ISO UTC date string "YYYY-MM-DD".
 *
 * The function uses the UTC getters so the output represents the date in UTC rather than local time.
 * @param d - The Date object to format.
 * @returns A string in the format "YYYY-MM-DD" representing the UTC date portion of `d`.
 */
const formatDateUTC = (d: Date): string => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/**
 * Computes the ISO week number and the ISO week-year for a given Date.
 *
 * Algorithm summary:
 * - Normalizes the input to a UTC date (time portion ignored).
 * - Shifts the date to the Thursday of the current week to determine the ISO year.
 * - Calculates the week number as the 1-based week index within the ISO year.
 * @param date - The Date for which to compute the ISO week/year (UTC date part is used).
 * @returns An object with:
 *   - week: ISO week number (1..53)
 *   - year: ISO week-year (the year that the ISO week belongs to)
 */
const getISOWeek = (date: Date): { week: number; year: number } => {
  const tmp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = tmp.getUTCDay() || 7; // Mon=1..Sun=7
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week: weekNo, year: tmp.getUTCFullYear() };
};

interface Aggregated {
  sum: number;
  count: number;
  min: Date;
  max: Date;
  meta: { week?: number; month?: number; year?: number; monthName?: string };
}

/**
 * Groups and aggregates daily numeric data into the requested time granularity and returns
 * averaged values for each group.
 *
 * Behavior and notes:
 * - Input `data` is expected as a Record whose keys are UTC date strings "YYYY-MM-DD" and
 *   whose values are numeric measurements.
 * - Invalid entries (malformed dates, non-number values, or NaN) are skipped.
 * - Supported `range` values:
 *   - "daily": each input date is kept as a separate group (key format: "day_YYYY-MM-DD").
 *   - "weekly": groups by ISO week and ISO week-year; raw group id includes week number and year.
 *   - "monthly": groups by calendar month (uses month name and 1-based month number).
 *   - "yearly": groups by calendar year.
 * - For weekly, monthly and yearly ranges the final output keys include the group's span using
 *   the earliest and latest dates in the group, e.g.:
 *     week_<n>_of_<year>_from_<YYYY-MM-DD>_to_<YYYY-MM-DD>
 *     month_<name>_<n>_from_<YYYY-MM-DD>_to_<YYYY-MM-DD>
 *     year_<YYYY>_from_<YYYY-MM-DD>_to_<YYYY-MM-DD>
 *   Daily keys are returned as "day_YYYY-MM-DD".
 * - Each group's returned value is the arithmetic average (sum/count) rounded to 2 decimal places.
 * - Output groups are ordered chronologically (ascending by the group's earliest date).
 * @param data - Record mapping UTC date strings ("YYYY-MM-DD") to numeric values.
 * @param range - The desired aggregation granularity ("daily" | "weekly" | "monthly" | "yearly").
 * @returns A Record whose keys are the formatted group identifiers described above and whose
 *   values are the averaged numeric value for that group (rounded to two decimals).
 */
export function groupDataByTimeRange(
  data: Record<string, number>,
  range: TimeRangesGranularity,
): Record<string, number> {
  const groups = new Map<string, Aggregated>();

  // iterate over data and group by range
  for (const [k, v] of Object.entries(data)) {
    const d = parseDateUTC(k);
    if (!d || typeof v !== 'number' || Number.isNaN(v)) {
      continue;
    }

    let groupId = '';
    let meta: Aggregated['meta'] = {};

    switch (range) {
      case 'daily':
        groupId = `day_${formatDateUTC(d)}`;
        meta = { year: d.getUTCFullYear() };
        break;
      case 'weekly': {
        const iso = getISOWeek(d);
        // include year in the raw id (we'll format final key later)
        groupId = `week_${iso.week}_of_${iso.year}`;
        meta = { week: iso.week, year: iso.year };
        break;
      }
      case 'monthly': {
        const mon = d.getUTCMonth() + 1;
        const name = MONTH_NAMES[d.getUTCMonth()];
        groupId = `month_${name}_${mon}`;
        meta = { month: mon, monthName: name, year: d.getUTCFullYear() };
        break;
      }
      case 'yearly': {
        const y = d.getUTCFullYear();
        groupId = `year_${y}`;
        meta = { year: y };
        break;
      }
    }

    const existing = groups.get(groupId);
    if (!existing) {
      groups.set(groupId, { sum: v, count: 1, min: d, max: d, meta });
    } else {
      existing.sum += v;
      existing.count += 1;
      if (d.getTime() < existing.min.getTime()) {
        existing.min = d;
      }
      if (d.getTime() > existing.max.getTime()) {
        existing.max = d;
      }
    }
  }

  // build final object: format keys with from/to
  // We'll sort groups by min date ascending so output is chronological.
  const entries = Array.from(groups.entries())
    .map(([rawKey, agg]) => ({
      rawKey,
      agg,
      from: formatDateUTC(agg.min),
      to: formatDateUTC(agg.max),
    }))
    .sort((a, b) => {
      if (a.from < b.from) {
        return -1;
      }

      return a.from > b.from ? 1 : 0;
    });

  const out: Record<string, number> = {};

  const formatAvg = (sum: number, count: number): number => {
    const avg = sum / count;
    // round to 2 decimals and return a number
    return Number(avg.toFixed(2));
  };

  for (const e of entries) {
    const avg = formatAvg(e.agg.sum, e.agg.count);

    let finalKey = e.rawKey;
    if (finalKey.startsWith('day_')) {
      finalKey = e.rawKey; // es. day_2025-11-01
    } else if (finalKey.startsWith('week_')) {
      finalKey = `${e.rawKey}_from_${e.from}_to_${e.to}`; // week_<n>_of_<year>_from_..._to_...
    } else if (finalKey.startsWith('month_')) {
      finalKey = `${e.rawKey}_from_${e.from}_to_${e.to}`;
    } else if (finalKey.startsWith('year_')) {
      finalKey = `${e.rawKey}_from_${e.from}_to_${e.to}`;
    }

    out[finalKey] = avg;
  }

  return out;
}

/**
 * Produces paired arrays of time labels and aggregated values for a chart or timeseries consumer.
 *
 * Behavior:
 * - Validates that `time` and `data` arrays have the same length; throws otherwise.
 * - For "daily" range, returns the original `time` and `data` arrays unchanged.
 * - For other ranges ("weekly", "monthly", "yearly"), the function:
 *   1. Builds a temporary date->value mapping from the parallel arrays.
 *   2. Delegates aggregation to `groupDataByTimeRange`.
 *   3. Returns the aggregated result as parallel arrays:
 *      - groupedTime: the grouped keys (in chronological order)
 *      - groupedData: the corresponding averaged numeric values
 * @param timeRange - The aggregation granularity to apply.
 * @param time - An array of UTC date strings ("YYYY-MM-DD") corresponding to `data`.
 * @param data - An array of numeric values corresponding to `time`.
 * @throws {Error} if `time` and `data` arrays have different lengths.
 * @returns An object with:
 *   - groupedTime: string[] of group labels (ordered chronologically)
 *   - groupedData: number[] of averaged values matching the `time` labels
 */
export function setDataByTimeRange(
  timeRange: TimeRangesGranularity,
  time: string[],
  data: number[],
): { groupedTime: string[]; groupedData: number[] } {
  if (time.length !== data.length) {
    throw new Error('Time and data arrays must have the same length');
  }

  if (timeRange === 'daily') {
    // No aggregation needed
    return { groupedTime: time, groupedData: data };
  }

  const groupedDataByDate = time.reduce((acc, curr, index) => ({ [curr]: data[index], ...acc }), {});
  const aggregatedData = groupDataByTimeRange(groupedDataByDate, timeRange);

  return {
    groupedTime: Object.keys(aggregatedData),
    groupedData: Object.values(aggregatedData),
  };
}
