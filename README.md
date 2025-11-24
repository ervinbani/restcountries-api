# Frontend Mentor - REST Countries API with Color Theme Switcher

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✅ See all countries from the API on the homepage
- ✅ Search for a country using an input field
- ✅ Filter countries by region
- ✅ Toggle the color scheme between light and dark mode
- ⏳ Click on a country to see more detailed information on a separate page (Coming soon)
- ⏳ Click through to the border countries on the detail page (Coming soon)

### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/rest-countries-api)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

## My process

### Built with

- **TypeScript** - For type-safe JavaScript development
- **Sass/SCSS** - CSS preprocessor with nested syntax
- **HTML5** - Semantic markup
- **CSS Custom Properties** - For theme switching
- **CSS Grid** - For responsive country cards layout
- **Flexbox** - For component layouts
- **Mobile-first workflow** - Responsive design approach
- **REST Countries API** - External API for country data
- **Font Awesome** - Icon library
- **Google Fonts (Nunito Sans)** - Typography

### What I learned

This project helped me strengthen my understanding of:

1. **TypeScript Class-based Architecture**: Organizing code using OOP principles

```typescript
class Main {
  private allCountries: Country[] = [];
  private filteredCountries: Country[] = [];

  private filterCountries(): void {
    // Filter logic with type safety
  }
}
```

2. **CSS Variables for Theming**: Dynamic theme switching with CSS custom properties

```scss
:root {
  --bg: hsl(0, 0%, 98%);
  --elements: hsl(0, 100%, 100%);
  --text: hsl(200, 15%, 8%);
}

[data-theme="dark"] {
  --bg: hsl(207, 26%, 17%);
  --elements: hsl(209, 23%, 22%);
  --text: hsl(0, 100%, 100%);
}
```

3. **LocalStorage for Persistence**: Saving user preferences

```typescript
localStorage.setItem("theme", newTheme);
const savedTheme = localStorage.getItem("theme") || "light";
```

4. **API Integration with TypeScript**: Type-safe data fetching

```typescript
static async fetchAllCountries(): Promise<Country[]> {
  const data = await ApiService.getAllCountries("fields=name,population,region,capital,flags");
  return data.map((countryData: any) => new Country(countryData));
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/rest-countries-api.git
cd rest-countries-api
```

2. Install dependencies

```bash
npm install
```

### Development

The project uses two watch modes that need to run simultaneously:

1. **TypeScript Compiler** (Terminal 1):

```bash
npm run watch
```

This compiles TypeScript files from `src/` to JavaScript in `dist/`

2. **Sass Compiler** (Terminal 2):

```bash
npm run sass
```

This compiles SCSS files from `src/styles/main.scss` to `src/styles/main.css`

3. Open `src/index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server src
```

## Project Structure

```
rest-countries-api/
├── src/
│   ├── models/
│   │   └── Countries.ts       # Country model and data fetching
│   ├── services/
│   │   └── ApiServices.ts     # API service layer
│   ├── styles/
│   │   ├── main.scss          # Main SCSS file with theming
│   │   └── main.css           # Compiled CSS (auto-generated)
│   ├── utils/
│   │   └── utils.ts           # Utility functions
│   ├── index.html             # Main HTML file
│   └── main.ts                # Application entry point
├── dist/                      # Compiled JavaScript (auto-generated)
├── .gitignore
├── package.json
├── tsconfig.json              # TypeScript configuration
└── README.md
```

## Features Implemented

### ✅ Dark Mode Toggle

- Smooth color transitions
- LocalStorage persistence
- Icon switching (moon ↔ sun)

### ✅ Search Functionality

- Real-time country name filtering
- Case-insensitive search

### ✅ Region Filter

- Filter by Africa, Americas, Asia, Europe, Oceania
- Combines with search functionality

### ✅ Responsive Design

- Mobile-first approach (375px)
- Desktop optimized (1440px)
- Tested from 320px to large screens

### ✅ API Integration

- REST Countries API v3.1
- Efficient field filtering
- Error handling
