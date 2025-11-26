# REST Countries API - Where in the world?

A responsive web application that allows users to explore countries around the world using the REST Countries API. Built with TypeScript, SCSS, and modern web development practices with comprehensive accessibility features.

🔗 **[Live Demo](https://ervinbani.github.io/restcountries-api/)**

### Features

- ✅ **Country Listing**: Browse all 250+ countries with detailed information displayed in responsive cards
- ✅ **Search Functionality**: Real-time search to find countries by name
- ✅ **Region Filter**: Filter countries by continent (Africa, Americas, Asia, Europe, Oceania)
- ✅ **Pagination**: Navigate through countries with 25 items per page for optimal performance
- ✅ **Detail View**: Click on any country to view comprehensive information including:
  - Native name, population, region, sub-region
  - Capital city, currencies, languages
  - Top-level domain and clickable border countries
- ✅ **Border Countries Navigation**: Click on border country buttons to navigate to their detail pages
- ✅ **Dark Mode**: Toggle between light and dark themes with persistent storage
- ✅ **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices
- ✅ **Accessibility**: WCAG compliant with ARIA labels, keyboard navigation, skip links, and screen reader support
- ✅ **Error Handling**: Comprehensive error handling with loading states and retry functionality

### Links

- 🔗 **[Live Demo](https://ervinbani.github.io/restcountries-api/)**
- 📦 **[GitHub Repository](https://github.com/ervinbani/restcountries-api)**

## Technologies Used

- **TypeScript**: Strongly-typed language for robust and maintainable code
- **SCSS**: CSS preprocessor with variables, nesting, and modern styling features
- **REST Countries API v3.1**: Comprehensive data source for country information
- **ES Modules**: Modern JavaScript module system for better code organization
- **Font Awesome 6.4.0**: Icon library for UI elements
- **Google Fonts (Nunito Sans)**: Typography with weights 300, 600, and 800
- **Git**: Version control with comprehensive commit history
- **GitHub Pages**: Free deployment platform for static sites

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ervinbani/restcountries-api.git
   cd restcountries-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the project**

   ```bash
   npm run build
   ```

   This will:

   - Compile TypeScript files to JavaScript
   - Compile SCSS to CSS
   - Copy HTML files to the dist/ folder

4. **Open the application**
   - Open `dist/index.html` in your browser
   - Or use a local development server

### Development

For development with auto-reload:

```bash
npm run dev
```

This runs both TypeScript and SCSS in watch mode simultaneously.

Or run them separately in different terminals:

**Terminal 1 - TypeScript Watch Mode:**

```bash
npm run watch:ts
```

**Terminal 2 - SCSS Watch Mode:**

```bash
npm run watch:sass
```

### Available Scripts

- `npm run build` - Full production build (TypeScript + SCSS + HTML)
- `npm run build:ts` - Compile TypeScript only
- `npm run build:sass` - Compile SCSS to CSS only
- `npm run copy:html` - Copy HTML files to dist/
- `npm run watch:ts` - Watch mode for TypeScript
- `npm run watch:sass` - Watch mode for SCSS
- `npm run dev` - Run both watch modes concurrently

## Project Structure

```
rest-countries-api/
├── src/
│   ├── index.html              # Main page HTML
│   ├── detail.html             # Country detail page HTML
│   ├── main.ts                 # Main page controller
│   ├── detail.ts               # Detail page controller
│   ├── models/
│   │   └── Countries.ts        # Country model and API integration
│   ├── services/
│   │   └── ApiServices.ts      # API service layer with error handling
│   ├── utils/
│   │   └── utils.ts            # Utility functions
│   └── styles/
│       ├── main.scss           # Main stylesheet with theme variables
│       └── _accessibility.scss # Accessibility-specific styles
├── dist/                       # Compiled output directory
│   ├── index.html              # Compiled main page
│   ├── detail.html             # Compiled detail page
│   ├── main.js                 # Compiled TypeScript
│   ├── detail.js
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── styles/
│       └── main.css            # Compiled CSS
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel deployment configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## API Integration

This project uses the [REST Countries API v3.1](https://restcountries.com/) to fetch comprehensive country data.

### Endpoints Used:

- `GET /v3.1/all?fields=name,population,region,capital,flags` - Fetch all countries with specific fields
- `GET /v3.1/name/{name}` - Search countries by name (partial match)
- `GET /v3.1/name/{name}?fullText=true` - Get country by exact name match (returns all fields)
- `GET /v3.1/alpha?codes={code},{code},{code}` - Fetch multiple countries by their 3-letter codes (for border countries)

### API Service Architecture:

The project implements a clean separation between the API layer and business logic:

```typescript
// ApiService - Low-level HTTP communication
class ApiService {
  static async getAllCountries(params?: string): Promise<any[]>;
  static async getCountryByName(name: string): Promise<any[]>;
  static async getCountryByFullName(name: string): Promise<any>;
  static async getCountriesByCodes(codes: string[]): Promise<any[]>;
}

// Country Model - Business logic and data transformation
class Country {
  static async fetchAllCountries(): Promise<Country[]>;
  static async searchCountries(query: string): Promise<Country[]>;
  static async fetchCountryByFullName(name: string): Promise<Country>;
  static async fetchCountriesByCodes(codes: string[]): Promise<Country[]>;
}
```

### Error Handling:

- **Network Errors**: Detected and displayed with user-friendly messages
- **404 Errors**: Handled for countries not found
- **Status Code Errors**: Generic error handling for other HTTP errors
- **Loading States**: Spinner animations during data fetching
- **Retry Functionality**: "Try Again" button on error states

## Accessibility Features

This application follows WCAG 2.1 Level AA guidelines and implements:

### Semantic HTML & ARIA

- Proper heading hierarchy (`h1`, `h2`)
- Semantic landmarks (`header`, `main`, `nav`)
- `role` attributes for dynamic regions (search, navigation, alert, status)
- `aria-label` on all interactive elements
- `aria-live="polite"` for dynamic content updates
- `aria-pressed` state on toggle buttons
- `aria-current="page"` on active pagination
- `aria-hidden="true"` on decorative icons

### Keyboard Navigation

- Skip link to main content (visible on focus)
- All interactive elements keyboard accessible
- Country cards focusable with `tabindex="0"` and `role="button"`
- Enter/Space key support for card navigation
- Visible focus indicators with 3px outline
- Logical tab order throughout the application

### Screen Reader Support

- Screen reader-only labels (`.sr-only` class)
- Descriptive labels for all form controls
- Loading states announced with `role="status"`
- Errors announced immediately with `role="alert"`
- All icons hidden from screen readers

### User Preferences

- **High Contrast Mode**: Enhanced borders and font weights
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **Dark Mode**: Eye-friendly dark theme option with localStorage persistence

### Additional Accessibility Features

- Minimum color contrast ratios met
- Form inputs properly labeled
- Button states clearly indicated
- Error messages descriptive and actionable
- Focus never lost during navigation

## Design Specifications

### Color Palette

**Light Mode:**

- Background: `hsl(0, 0%, 98%)`
- Elements: `hsl(0, 100%, 100%)`
- Text: `hsl(200, 15%, 8%)`
- Input: `hsl(0, 0%, 52%)`

**Dark Mode:**

- Background: `hsl(207, 26%, 17%)`
- Elements: `hsl(209, 23%, 22%)`
- Text: `hsl(0, 100%, 100%)`
- Input: `hsl(0, 100%, 100%)`

### Typography

- **Font Family**: Nunito Sans (from Google Fonts)
- **Weights**:
  - 300 (Light) - Body text
  - 600 (Semi-Bold) - Labels and emphasis
  - 800 (Extra-Bold) - Headings

### Responsive Breakpoints

- **Mobile**: < 768px (Single column layout)
- **Tablet**: 768px - 1024px (2-3 column grid)
- **Desktop**: > 1024px (4 column grid)

### Layout

- CSS Grid for country cards
- Flexbox for header and controls
- Mobile-first responsive design
- Smooth transitions between breakpoints

## Version Control

This project demonstrates professional Git practices:

- ✅ **Atomic Commits**: Each commit represents a single logical change
- ✅ **Descriptive Messages**: Clear commit messages explaining what and why
- ✅ **Regular Commits**: Frequent commits documenting development progress
- ✅ **Clean History**: Well-organized commit history
- ✅ **.gitignore**: Properly configured to exclude `node_modules/`, `dist/`, etc.
- ✅ **Branch Management**: Main branch protected with stable code
- ✅ **Documentation**: Comprehensive README with setup instructions

### Key Commits:

1. Initial TypeScript and project setup
2. API integration and country model
3. Search and filter functionality
4. Dark mode implementation
5. Pagination system
6. Detail page with full country information
7. Error handling and loading states
8. Accessibility enhancements
9. SCSS variable refactoring
10. Border countries with full names and navigation
11. TypeScript interfaces for type safety
12. Build configuration for deployment

## Deployment

The application is deployed on **GitHub Pages** and automatically serves the `dist/` folder.

🔗 **Live URL**: [https://ervinbani.github.io/restcountries-api/](https://ervinbani.github.io/restcountries-api/)

### Deployment Process:

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Commit and push changes**:

   ```bash
   git add .
   git commit -m "Build for deployment"
   git push origin main
   ```

3. **GitHub Pages automatically serves** the content from the `dist/` folder

### Alternative Deployment Options:

The project is also configured for **Vercel** deployment with `vercel.json`:

- Automatic builds on push
- Environment-specific configurations
- Custom domain support
- CDN distribution

## Development Reflection

### Development Process

Building this REST Countries API application was an enriching journey that reinforced many modern web development concepts. I started with setting up a TypeScript environment, which initially posed challenges with module configuration. The `verbatimModuleSyntax` error taught me the importance of understanding ES modules vs CommonJS, leading to a proper configuration with `"type": "module"` in package.json.

The API integration phase was straightforward thanks to TypeScript's type safety, which caught potential errors early. Implementing pagination was crucial—displaying 250+ countries at once caused performance issues, so breaking them into 25 per page significantly improved user experience and load times.

### Challenges Faced

#### 1. TypeScript Module Configuration

**Challenge**: Encountered `verbatimModuleSyntax` error when using CommonJS modules.  
**Solution**: Converted to ES modules by adding `"type": "module"` to package.json and configuring TypeScript with `"module": "nodenext"`.

#### 2. Accessibility Implementation

One of the biggest challenges was achieving comprehensive accessibility. Initially, my accessibility score was around 60/100. Through research and implementation of ARIA labels, keyboard navigation, skip links, and screen reader support, I elevated it to 90+. This taught me that accessibility isn't an afterthought but an integral part of development that should be considered from the start.

#### 3. Performance Optimization

**Challenge**: Rendering 250+ countries caused sluggish performance.  
**Solution**: Implemented pagination system showing 25 countries per page with intuitive navigation controls, significantly improving rendering speed and user experience.

#### 4. Dark Mode Persistence

The dark mode feature with localStorage persistence was particularly satisfying to implement. Watching the theme smoothly transition and persist across sessions showcased the power of CSS custom properties combined with JavaScript state management.

#### 5. Error Handling

Error handling presented interesting scenarios—network failures, 404 errors, and loading states all needed user-friendly feedback. Implementing retry functionality made the app more resilient and user-centric, ensuring users aren't left stranded when API calls fail.

#### 6. Border Countries Implementation

**Challenge**: Border countries were initially displayed as 3-letter ISO codes (e.g., USA, CAN, MEX) which weren't user-friendly.  
**Solution**: Implemented asynchronous loading of border countries using the `/alpha?codes=` API endpoint to fetch full country names. Added click navigation to allow users to explore neighboring countries seamlessly.

### Solutions Implemented

- **Clean Architecture**: Separated concerns with Model-Service-View pattern
- **Type Safety**: Leveraged TypeScript for robust, maintainable code
- **SCSS Variables**: Used CSS custom properties for dynamic theming
- **API Service Layer**: Abstracted HTTP calls with comprehensive error handling
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Loading States**: Visual feedback during asynchronous operations

### Technical Learnings

1. **TypeScript Class-based Architecture**: Organizing code with OOP principles improved maintainability
2. **CSS Custom Properties**: Dynamic theme switching without JavaScript DOM manipulation
3. **LocalStorage API**: Persisting user preferences across sessions
4. **REST API Integration**: Efficient field filtering and data transformation
5. **ARIA Attributes**: Proper use of roles, labels, and live regions for accessibility
6. **Git Best Practices**: Atomic commits with descriptive messages

### Conclusion

This project solidified my understanding of TypeScript, modern CSS with SCSS, API integration patterns, and the critical importance of accessibility in web applications. The combination of strong typing, clean architecture, and user-centric design resulted in a robust, maintainable application. Most importantly, I learned that building accessible, performant applications requires intentional planning and continuous refinement throughout the development process.

The experience of taking a project from initial setup through deployment, while solving real challenges along the way, has been invaluable for my growth as a developer. Successfully implementing features like clickable border countries with asynchronous data loading taught me the importance of progressive enhancement and user experience optimization. I'm proud of the final result and the lessons learned throughout this journey.

If I were to continue development, I'd focus on adding offline support with service workers, implementing a comparison feature, adding unit tests for better code reliability, and creating a favorites system with localStorage persistence.

## Future Improvements

- [ ] **Advanced Filters**: Multiple simultaneous filters (population range, language, currency)
- [ ] **Favorites System**: Save favorite countries with localStorage persistence
- [ ] **Comparison Feature**: Side-by-side comparison of multiple countries
- [ ] **Maps Integration**: Interactive maps showing country locations using Leaflet or Google Maps
- [ ] **Export Functionality**: Download country data as CSV or JSON
- [ ] **Offline Support**: Service workers for offline functionality and caching
- [ ] **Internationalization (i18n)**: Multi-language support for global users
- [ ] **Unit Tests**: Jest/Vitest for testing components and API services
- [ ] **Animation Enhancements**: Smooth page transitions and micro-interactions
- [ ] **Performance Optimization**: Lazy loading images and virtual scrolling
- [ ] **PWA Features**: Make the app installable as a Progressive Web App

## Author

**Ervin Bani**

- GitHub: [@ervinbani](https://github.com/ervinbani)
- Repository: [restcountries-api](https://github.com/ervinbani/restcountries-api)
- Live Demo: [https://ervinbani.github.io/restcountries-api/](https://ervinbani.github.io/restcountries-api/)

## Acknowledgments

- [REST Countries API](https://restcountries.com/) - Comprehensive and free country data API
- [Frontend Mentor](https://www.frontendmentor.io/) - Project design inspiration
- [Font Awesome](https://fontawesome.com/) - Extensive icon library
- [Google Fonts](https://fonts.google.com/) - Nunito Sans font family
- [MDN Web Docs](https://developer.mozilla.org/) - Web development documentation
- [TypeScript Documentation](https://www.typescriptlang.org/) - TypeScript language reference
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility best practices

---
