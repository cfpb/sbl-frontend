import { DateTime } from 'luxon';

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
  return localDateTime.toFormat(format);
}

export { formatDateTime, formatDateTimeShort };
