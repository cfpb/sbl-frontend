import { DateTime } from 'luxon';
import { One } from './constants';

/**
 * These adjustments aim to align our date/time displays with the CFPB editorial style guide.
 *
 * Format: Array of arrays which contain [0] the string to replace and [1] the string to replace it with.
 */
const adjustments: string[][] = [
  ['AM', 'a.m.'], // Day/night
  ['PM', 'p.m.'],
  ['CDT', 'CT'], // Timezone
  ['EDT', 'ET'],
  ['MDT', 'MT'],
  ['PDT', 'PT'],
  ['January', 'Jan.'], // Month
  ['February', 'Feb.'],
  ['August', 'Aug.'],
  ['September', 'Sep.'],
  ['October', 'Oct.'],
  ['November', 'Nov.'],
  ['December', 'Dec.'],
];

function formatDateTime(isoTimeString: string): string {
  // Parse the ISO time string in UTC
  const dt = DateTime.fromISO(isoTimeString, { zone: 'utc' });
  // Convert to local timezone

  const localDateTime = dt.setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  // Format the date and time
  const formattedDateTime = localDateTime.toLocaleString({
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
  return formattedDateTime;
}

/* Example usage */
// const isoTimeString = '2023-01-14T12:30:00Z';
// const formattedDateTime = formatDateTime(isoTimeString);
// example: January 14, 2023 at 12:30 PM LocalTimeZone

// Formats found at: https://moment.github.io/luxon/#/formatting?id=presets
function formatDateTimeShort(isoTimeString: string, format = 'ff'): string {
  const dt = DateTime.fromISO(isoTimeString, { zone: 'utc' });
  const localDateTime = dt.setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  let timeString = localDateTime.toFormat(format);

  for (const pair of adjustments)
    timeString = timeString.replace(pair[0], pair[One]);

  return timeString;
}

export { formatDateTime, formatDateTimeShort };
