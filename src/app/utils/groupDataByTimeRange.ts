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

const formatDateUTC = (d: Date): string => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// ISO week algorithm (returns week number and ISO-year)
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

export function groupDataByTimeRange(
  data: Record<string, number>,
  range: TimeRangesGranularity,
): Record<string, number> {
  const groups = new Map<string, Aggregated>();

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

export function setDataByTimeRange(
  timeRange: TimeRangesGranularity,
  time: string[],
  data: number[],
): { time: string[]; data: number[] } {
  if (time.length !== data.length) {
    throw new Error('Time and data arrays must have the same length');
  }

  if (timeRange === 'daily') {
    // No aggregation needed
    return { time, data };
  }

  const groupedDataByDate = time.reduce((acc, curr, index) => ({ [curr]: data[index], ...acc }), {});
  const aggregatedData = groupDataByTimeRange(groupedDataByDate, timeRange);

  return {
    time: Object.keys(aggregatedData),
    data: Object.values(aggregatedData),
  };
}
