# ESMO 2025 Quiz Application

A React Native Expo quiz application for trade fairs, featuring a clean, modern UI with the Guardant Health branding.

## Features

- **Start Screen**: Welcome screen with branding and start button
- **Quiz Flow**: 6 multiple-choice questions with:
  - Answer selection with visual feedback
  - Reveal button to show correct answers
  - Progress indicator
  - Timer tracking
- **Contact Form**: Collects user information with validation
  - Required fields: Name, Surname, Email, City, Country, Affiliation
  - Optional fields: Area of Interest, Speciality, Liquid Biopsy Access
  - Privacy consent checkboxes
- **Results Screen**: Shows final score and time
- **CSV Export**: Saves quiz results and form data to CSV file

## Tech Stack

- React Native with Expo SDK 54
- Expo Router for navigation
- React Hook Form for form validation
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (>= 20.19.4 recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

#### Start the development server

```bash
npm start
```

Then press 'w' for web, 'i' for iOS, or 'a' for Android.

#### Web

```bash
npm run web
```

#### iOS

```bash
npm run ios
```

#### Android

```bash
npm run android
```

## Project Structure

```
app/
  ├── _layout.tsx           # Root layout with QuizProvider
  ├── index.tsx             # Start screen
  ├── quiz.tsx              # Quiz questions screen
  ├── form.tsx              # Contact form screen
  └── final.tsx             # Results/congratulations screen

components/
  └── ui/
      ├── button.tsx        # Reusable button component
      ├── answer-option.tsx # Quiz answer option
      ├── progress-indicator.tsx
      ├── screen-layout.tsx # Layout with background
      └── logo.tsx

data/
  └── questions.ts          # Quiz questions data

contexts/
  └── quiz-context.tsx      # Global quiz state management

types/
  └── quiz.ts               # TypeScript types

constants/
  └── theme.ts              # Colors, spacing, and style constants
```

## Color Palette

- White: `#ffffff`
- Black: `#000000`
- Light Gray: `#edeeef`
- Science Blue: `#005cb9`
- Light Blue: `#1cb3e8`
- Blood Red: `#ea1d23`

## Design Principles

- **KISS**: Keep It Simple, Stupid - clean, straightforward code
- **DRY**: Don't Repeat Yourself - reusable components
- **Separation of Concerns**: Styles in separate files using CSS variables/constants

## CSV Export

Quiz results are automatically saved when the user completes the form. The CSV includes:

- User information (name, email, city, etc.)
- Quiz score and time
- Individual question responses and correctness

On web, the CSV is downloaded automatically. On mobile, it's logged to console.

## Customization

### Changing Questions

Edit `data/questions.ts` to modify quiz questions and answers.

### Styling

All styles use constants from `constants/theme.ts`. Modify colors, spacing, or font sizes there to update the entire app.

### Branding

Replace `assets/images/icon.png` with your logo and `assets/images/background.png` with your background image.

## License

Private project for ESMO 2025.
