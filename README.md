# Artist Exercise Roulette 🎨

A colorful, interactive web tool to generate random art exercise combinations for artists looking for inspiration and practice ideas.

## Features

- 🎡 **Traditional Spinning Roulette Wheels**
  - See all options arranged in a circle
  - Watch the wheel spin to select your result
  - Visual pointer indicates the winning choice
  - Maximum 3 wheels per row for optimal viewing
  
- 🎨 **Core Wheels**
  - Tool Selection (Oil Paint, Watercolor, Pencil, etc.)
  - Style Selection (Realism, Impressionism, Abstract, etc.)
  - Subject Selection (Portrait, Landscape, Still Life, etc.)

- ⚙️ **Optional Wheels** (Can be toggled on/off below the main wheels)
  - Support Selection (Canvas, Paper, Wood Panel, etc.)
  - Time Limit (5 min to 90 min)
  - ✨ **Twist Element** - Add fun elements to your artwork!
    - A Duck 🦆
    - A Minion 😄
    - A Hidden Cat 🐱
    - A Tiny Robot 🤖
    - Googly Eyes 👁️
    - A Rainbow 🌈
    - A Ghost 👻
    - Hidden Stars ⭐
    - A Balloon 🎈
    - A Butterfly 🦋

- ✨ **Interactive Features**
  - Toggle optional wheels on/off
  - Press `Space` to spin wheels one by one in sequence
  - Confetti celebration when complete
  - Individual spin buttons for each wheel
  - Color-coded results for each category

- 🎨 **Beautiful Design**
  - Clean, vibrant interface
  - Smooth spinning animations
  - All options visible on each wheel
  - Fully responsive (desktop & mobile)

## Quick Start

### Prerequisites
- Node.js 16+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The app will be available at `http://localhost:5173`

## Usage

1. **Enable optional wheels** (if desired) using the checkboxes at the top
2. Click individual "Spin" buttons to randomize one wheel at a time
3. Press `Space` to automatically spin all enabled wheels one by one in sequence
4. Watch the traditional spinning animation as each wheel selects your exercise
5. Get inspired by your complete art exercise combination!

## Local Deployment

After building (`pnpm build`), the `dist/` folder contains a complete static site that can be:
- Opened directly in a browser (`dist/index.html`)
- Served by any static file server
- Deployed to any hosting platform (Netlify, Vercel, GitHub Pages, etc.)

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules
- canvas-confetti

## License

MIT
