# Search Animations

A modern, animated search interface built with Next.js featuring smooth transitions, interactive tooltips, and dynamic content filtering. Press the 'S' key to activate the search and experience fluid animations powered by TailwindCSS.

## ✨ Features

- **Keyboard Activation**: Press 'S' key to focus the search input
- **Smooth Animations**: Height transitions, fade effects, and counting animations
- **Real-time Search**: 2-second debounced search with live filtering
- **Interactive Tooltips**: Hover tooltips with copy functionality
- **Skeleton Loading**: Animated loading states during data fetching
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Category Filtering**: Filter results by All, Files, Profile, Chats, Lists
- **Settings Panel**: Customizable display options
- **Text Highlighting**: Search terms highlighted in results

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 18](https://react.dev)** - UI library with hooks and modern patterns

### Styling & Animation

- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes intelligently
- **[Clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **CSS Transitions** - Smooth animations for height, opacity, and transforms

### Icons & Typography

- **[Lucide React](https://lucide.dev)** - Beautiful, customizable SVG icons
- **Sequel Sans** - Custom font family with multiple weights:
  - Light (300) - Display text
  - Regular (400) - Body text
  - Semibold (600) - Display text
  - Bold (800) - Headings

### Code Quality

- **[Prettier](https://prettier.io)** - Code formatting
- **[ESLint](https://eslint.org)** - Code linting and error detection

## 🎨 Animation System

### TailwindCSS Animations Used

- `transition-all` - Smooth property transitions
- `duration-*` - Animation timing (200ms, 500ms, 1000ms)
- `ease-in-out` - Smooth easing functions
- `animate-pulse` - Skeleton loading effect
- `opacity-*` - Fade in/out effects
- `max-h-*` - Height expansion animations
- `transform` - Scale and translate effects
- `group-hover:*` - Hover state animations

### Key Animation Features

1. **Search Activation**: Smooth height expansion when search is active
2. **Counter Animation**: Numbers count up from 0 to target value
3. **Tooltip Transitions**: Fade in/out with proper positioning
4. **Hover Effects**: Interactive button and row hover states
5. **Loading States**: Pulsing skeleton loaders during data fetch

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and font imports
│   ├── layout.js            # Root layout component
│   └── page.jsx             # Main page component
├── components/
│   ├── Searchbar.jsx        # Main search input component
│   ├── Results.jsx          # Search results display
│   ├── DataRow.jsx          # Individual result row
│   ├── SkeletonLoader.jsx   # Loading state component
│   ├── SettingsDialog.jsx   # Settings panel
│   └── ui/                  # Reusable UI components
├── lib/
│   └── utils.js             # Utility functions
└── assets/
    └── cursor.svg           # Custom cursor icon
```

## 🎯 How It Works

### Search Flow

1. **Keyboard Activation**: Global 'S' key listener focuses search input
2. **Input Handling**: Real-time input with 2-second debounce
3. **Data Fetching**: Fetches from `/public/results.json`
4. **Filtering**: Filters results based on title matching
5. **Animation**: Smooth height expansion and content fade-in
6. **Display**: Renders filtered results with animations

### Animation Triggers

- **Search Input**: Height expansion on focus/input
- **Results Loading**: Skeleton loader during fetch
- **Counter Updates**: Animated counting for result counts
- **Hover States**: Tooltip and button hover effects
- **Settings Panel**: Slide-in animation for settings

## 🎨 Design System

### Color Palette

- **Background**: #e0e0e0 (Light gray)
- **Foreground**: #292929 (Dark gray)
- **Font Black**: #050505 (Near black)
- **White**: #ffffff (Pure white)

### Typography

- **Font Family**: Sequel Sans (Custom)
- **Weights**: 300 (Light), 400 (Regular), 600 (Semibold), 800 (Bold)
- **Fallbacks**: System fonts for better compatibility

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "15.0.0",
    "react": "18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "prettier": "^3.0.0",
    "eslint": "^8.0.0"
  }
}
```

## 🚀 Deployment

- Checkout this link to preview the [Website](https://search-animations.vercel.app/)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
