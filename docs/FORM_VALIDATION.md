# Form Validation Documentation

This document describes the validation rules applied to the donation form fields.

## Validation Rules by Field

### 1. Name & Surname

- **Minimum length**: 1 character
- **Maximum length**: 64 characters
- **Allowed characters**:
  - Letters (all Unicode letters, including accented characters)
  - Spaces
  - Dot (.)
  - Apostrophe (')
  - Hyphen (-)
- **Not allowed**:
  - Digits (0-9)
  - Special characters: `<`, `>`, `/`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `(`, `)`, etc.

**Valid examples**:

- `John`
- `Mary Jane`
- `O'Brien`
- `Jean-Pierre`
- `José`

**Invalid examples**:

- `John123` (contains numbers)
- `John@Doe` (contains special character)
- `John$Smith` (contains special character)

---

### 2. Email

- **Must contain**: `@` symbol
- **Must end with**: `.com`
- **Format**: Valid email format (e.g., `user@domain.com`)
- **Blocked**: Disposable/temporary email domains

**Blocked disposable domains include**:

- tempmail.com
- 10minutemail.com
- guerrillamail.com
- mailinator.com
- throwaway.email
- And 10+ more common disposable domains

**Valid examples**:

- `john.doe@company.com`
- `test+tag@example.com`
- `user_name@domain.com`

**Invalid examples**:

- `user@example.org` (not .com)
- `user@example.net` (not .com)
- `test@tempmail.com` (disposable domain)
- `notanemail` (invalid format)

---

### 3. City & Country

- **Minimum length**: 1 character
- **Maximum length**: 20 characters
- **Allowed characters**:
  - Letters only (all Unicode letters)
  - Spaces
  - Hyphens (-)
- **Not allowed**:
  - Digits (0-9)
  - Special characters: `<`, `>`, `/`, `@`, `#`, `$`, etc.

**Valid examples**:

- `London`
- `New York`
- `São Paulo`
- `Saint-Denis`

**Invalid examples**:

- `City123` (contains numbers)
- `City@Name` (contains special character)
- `VeryLongCityNameThatExceedsTheLimit` (over 20 characters)

---

### 4. Affiliation

- **Maximum length**: 20 characters
- **Allowed characters**:
  - Letters (all Unicode letters)
  - Digits (0-9)
  - Spaces
  - Hyphen (-)
- **Not allowed**:
  - Special characters: `@`, `#`, `$`, `<`, `>`, `/`, `\`, `[`, `]`, `{`, `}`, etc.

**Valid examples**:

- `Hospital ABC`
- `Clinic-123`
- `Med Center 2`

**Invalid examples**:

- `Hospital@ABC` (contains @)
- `Clinic#123` (contains #)
- `VeryLongAffiliationName` (over 20 characters)

---

### 5. Area of Interest (Optional)

- **Maximum length**: 80 characters
- **Optional**: Can be left empty
- **Allowed characters**:
  - Letters (all Unicode letters)
  - Digits (0-9)
  - Spaces
  - Comma (,)
  - Dot (.)
  - Hyphen (-)
- **Not allowed**:
  - Special characters: `<`, `>`, `/`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, etc.

**Valid examples**:

- `Oncology`
- `Cancer Research, Immunotherapy`
- `Breast Cancer, Stage 4`
- `Research-2024`
- `` (empty - optional)

**Invalid examples**:

- `Research@Topic` (contains @)
- `Topic#1` (contains #)
- `Very long area of interest text that exceeds the maximum allowed length of 80 characters` (over 80 chars)

---

## Testing the Validation

To test the validation functions, you can run the test file:

```bash
npx ts-node utils/form-validation.test.ts
```

This will run all validation tests and show which cases pass or fail.

## Implementation

All validation functions are located in `utils/form-validation.ts` and are imported into the form component:

```typescript
import {
  validateName,
  validateEmail,
  validateLocation,
  validateAffiliation,
  validateAreaOfInterest,
} from '@/utils/form-validation'
```

Each function returns:

- `true` if validation passes
- A string error message if validation fails

## Adding New Disposable Email Domains

To block additional disposable email domains, add them to the `DISPOSABLE_EMAIL_DOMAINS` array in `utils/form-validation.ts`:

```typescript
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'newdomain.com', // Add new domains here
  // ...
]
```
