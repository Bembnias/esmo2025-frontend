// Temporary/disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  'guerrillamail.com',
  'mailinator.com',
  '10minutemail.com',
  'trashmail.com',
  'fakeinbox.com',
  'getnada.com',
  'temp-mail.org',
  'yopmail.com',
  'sharklasers.com',
  'grr.la',
  'guerrillamail.info',
  'guerrillamail.net',
  'guerrillamail.org',
  'spam4.me',
  'maildrop.cc',
  'mailnesia.com',
  'dispostable.com',
  'mintemail.com',
]

/**
 * Validates name and surname fields
 * - Min length: 1 character
 * - Max length: 64 characters
 * - Allowed: letters, spaces, dot, apostrophe, hyphen
 * - Not allowed: digits and special characters
 */
export const validateName = (value: string): string | boolean => {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return 'This field cannot be empty'
  }

  if (trimmedValue.length > 64) {
    return 'Maximum length is 64 characters'
  }

  // Only letters (including Unicode), spaces, dot, apostrophe, hyphen
  const namePattern = /^[\p{L}\s.''-]+$/u
  if (!namePattern.test(trimmedValue)) {
    return 'Only letters, spaces, dots, apostrophes, and hyphens are allowed'
  }

  // Block special characters
  const blockedChars = /[<>/@#$%^&*()_+=[\]{}|\\;:,<>?~`]/
  if (blockedChars.test(trimmedValue)) {
    return 'Special characters are not allowed'
  }

  return true
}

/**
 * Validates email field
 * - Must contain "@"
 * - Must end with .com
 * - Blocks disposable email domains
 * - Validates proper email format
 */
export const validateEmail = (value: string): string | boolean => {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return 'Email cannot be empty'
  }

  // Basic email pattern
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  if (!emailPattern.test(trimmedValue)) {
    return 'Invalid email address'
  }

  // Must end with .com
  if (!trimmedValue.toLowerCase().endsWith('.com')) {
    return 'Email must end with .com'
  }

  // Extract domain and check against disposable email list
  const domain = trimmedValue.split('@')[1]?.toLowerCase()
  if (domain && DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return 'Disposable email addresses are not allowed'
  }

  return true
}

/**
 * Validates city and country fields
 * - Min length: 1 character
 * - Max length: 20 characters
 * - Only letters allowed
 * - No digits or special characters
 */
export const validateLocation = (value: string): string | boolean => {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return 'This field cannot be empty'
  }

  if (trimmedValue.length > 20) {
    return 'Maximum length is 20 characters'
  }

  // Only letters (including Unicode) and spaces
  const locationPattern = /^[\p{L}\s-]+$/u
  if (!locationPattern.test(trimmedValue)) {
    return 'Only letters, spaces, and hyphens are allowed'
  }

  // Explicitly block digits
  if (/\d/.test(trimmedValue)) {
    return 'Numbers are not allowed'
  }

  // Block special characters
  const blockedChars = /[<>/@#$%^&*()_+=[\]{}|\\;:,<>?~`.'"!]/
  if (blockedChars.test(trimmedValue)) {
    return 'Special characters are not allowed'
  }

  return true
}

/**
 * Validates affiliation field
 * - Max length: 20 characters
 * - Allowed: letters, digits, spaces, hyphen
 * - Not allowed: special characters like @, #, $, <, >
 */
export const validateAffiliation = (value: string): string | boolean => {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return 'Affiliation cannot be empty'
  }

  if (trimmedValue.length > 20) {
    return 'Maximum length is 20 characters'
  }

  // Only letters (including Unicode), digits, spaces, hyphen
  const affiliationPattern = /^[\p{L}\d\s-]+$/u
  if (!affiliationPattern.test(trimmedValue)) {
    return 'Only letters, numbers, spaces, and hyphens are allowed'
  }

  // Block special characters
  const blockedChars = /[@#$<>\/\\[\]{}|;:,?~`'"!%^&*()_+=]/
  if (blockedChars.test(trimmedValue)) {
    return 'Special characters are not allowed'
  }

  return true
}

/**
 * Validates area of interest field (optional)
 * - Max length: 80 characters
 * - Allowed: letters, digits, spaces, comma, dot, hyphen
 * - Not allowed: special characters like <, >, /, @, #, $
 */
export const validateAreaOfInterest = (value: string): string | boolean => {
  // This field is optional, so empty is allowed
  if (!value || value.trim().length === 0) {
    return true
  }

  const trimmedValue = value.trim()

  if (trimmedValue.length > 80) {
    return 'Maximum length is 80 characters'
  }

  // Only letters (including Unicode), digits, spaces, comma, dot, hyphen
  const areaPattern = /^[\p{L}\d\s,.-]+$/u
  if (!areaPattern.test(trimmedValue)) {
    return 'Only letters, numbers, spaces, commas, dots, and hyphens are allowed'
  }

  // Block special characters
  const blockedChars = /[<>/@#$%^&*()_+=[\]{}|\\;:?~`'"!]/
  if (blockedChars.test(trimmedValue)) {
    return 'Special characters are not allowed'
  }

  return true
}
