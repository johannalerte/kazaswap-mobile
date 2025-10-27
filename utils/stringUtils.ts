/**
 * Converts a string to sentence case (first letter uppercase, rest lowercase)
 * @param str - The string to convert
 * @returns The string in sentence case
 */
export const toSentenceCase = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats a full name (first + last) in sentence case
 * @param firstName - First name
 * @param lastName - Last name
 * @returns Formatted full name in sentence case
 */
export const formatUserName = (firstName?: string, lastName?: string): string => {
  const first = firstName ? toSentenceCase(firstName) : '';
  const last = lastName ? toSentenceCase(lastName) : '';
  
  return [first, last].filter(Boolean).join(' ') || 'User';
};

/**
 * Removes postal codes from city names and formats as "City, Country"
 * @param city - City name that may contain postal codes
 * @param country - Country name
 * @returns Formatted string as "City, Country"
 */
export const formatCityCountry = (city?: string, country?: string): string => {
  if (!city && !country) return '';
  
  let cleanCity = city || '';
  
  // Remove common postal code patterns
  cleanCity = cleanCity
    // Remove 5-digit postal codes (US format)
    .replace(/\b\d{5}\b/g, '')
    // Remove postal codes with letters and numbers (UK, CA format)
    .replace(/\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/gi, '')
    // Remove German postal codes (5 digits)
    .replace(/\b\d{5}\s+/g, '')
    // Remove other common patterns
    .replace(/\b\d{4,6}\b/g, '')
    // Clean up extra spaces and commas
    .replace(/,\s*,/g, ',')
    .replace(/\s+/g, ' ')
    .replace(/^\s*,\s*|\s*,\s*$/g, '')
    .trim();
  
  const parts = [cleanCity, country].filter(Boolean);
  return parts.join(', ');
};