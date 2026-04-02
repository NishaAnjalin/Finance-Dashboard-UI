# Finance Dashboard UI

A clean, modern, and interactive finance tracking dashboard built with React and Vite. It demonstrates solid frontend architecture, state management, and modern UI/UX design featuring glassmorphism, theming, and responsive layout.

## Features

- **Dashboard Overview:** Displays total balance, income, expenses, and visualizes data using Recharts (Balance Trend and Top Spending).
- **Transactions Management:** View transactions, search by description/category, and filter by income or expense.
- **Insights:** Provides contextual analysis such as financial health observations, savings rate, and highest spending category.
- **Role-Based Access Control:** 
  - **Viewer (Default):** Can view all data.
  - **Admin:** Can add and delete transactions.
- **Theming:** Full support for both Dark Mode and Light Mode with dynamic transitions.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **React:** Core library for building the UI component tree.
- **Vite:** High-performance build tool and dev server.
- **Recharts:** Composable charting library to render interactive SVGs.
- **Lucide React:** Beautiful and consistent iconography.
- **Vanilla CSS:** Custom CSS relying on variables (`index.css`) for maximal flexibility without overhead, implementing a modern aesthetic with glassmorphism.

## Structure

- `src/context/AppContext.jsx`: Manages global state including transactions, application theme, and simulated user role. Uses Context API and Local Storage for data persistence.
- `src/components`: 
  - `Layout`: Handled by `App.jsx`, `Header.jsx`, and `Sidebar.jsx`.
  - `Overview`: Key metrics and visualizations.
  - `Transactions`: Dynamic table with search functionality and a responsive form for creating new transactions in admin mode.
  - `Insights`: Logic to aggregate and observe user spending patterns.

## Getting Started

1. **Install Dependencies**
   Run the following command to install required packages:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   Start the application locally on your machine:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open the output Local URL (usually `http://localhost:5174`) in your browser to view the application.

## Design Decisions

- **Modularity:** Components are focused on specific features (e.g., Transactions vs. Insights), ensuring readability and scalability.
- **Data Persistence:** Automatically uses LocalStorage so user actions (adding/deleting transactions, changing settings) aren't lost on reload!
- **State Context:** Avoided large state management libraries like Redux for a simpler robust Context approach that meets the needs of a single-page dashboard efficiently. 
- **Modern Aesthetics:** Chosen aesthetics borrow heavily from neo-glassmorphism emphasizing light shadows, dark contrasting backgrounds, and subtle blur effects to give a very premium and engaging vibe.

Enjoy tracking your finances!
