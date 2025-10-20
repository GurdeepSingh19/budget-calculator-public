# Budget Calculator Tool

A modern, fully-featured web-based budget calculator for tracking monthly and weekly income, expenses, and savings. Built with Next.js, React, and TypeScript.

![Budget Calculator](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### Core Functionality
- **Income & Expense Tracking**: Add, edit, and remove income and expense categories
- **Planned vs Actual**: Track planned amounts, actual amounts, and automatically calculate differences
- **Default Categories**: Pre-configured categories for common income sources and expenses
- **Custom Categories**: Add your own custom categories for personalized tracking
- **Period Switching**: Toggle between weekly and monthly budget views

### Visualizations
- **Bar Chart**: Compare planned vs actual amounts across all categories
- **Line Chart**: Track savings trends over time with multiple data series
- **Real-time Updates**: Charts update automatically as you enter data
- **Modern Design**: Vibrant, distinct colors for easy data interpretation

### Data Management
- **Auto-save**: All changes are automatically saved to local storage
- **Data Persistence**: Your budget data persists across browser sessions
- **Excel Export**: Export all budget data to Excel format (.xlsx) for external analysis
- **Summary Cards**: View total income, expenses, and net savings at a glance

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI**: Hover effects, smooth transitions, and intuitive controls
- **Accessible**: Built with accessibility best practices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/GurdeepSingh19/budget-calculator-public.git
   cd budget-calculator
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Adding Categories
1. Click the "Add Category" button in either the Income or Expenses section
2. Enter the category name
3. Input planned and actual amounts
4. The difference is calculated automatically

### Editing Categories
- Click on any input field to edit the values
- Changes are saved automatically
- The charts update in real-time

### Removing Categories
- Click the trash icon next to any category to remove it
- Default categories can be removed if not needed

### Switching Periods
- Use the toggle at the top to switch between Weekly and Monthly views
- Data is saved separately for each period

### Exporting Data
- Click the "Export to Excel" button to download your budget data
- The Excel file includes all income, expenses, and summary information

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Charting library for React
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[SheetJS](https://sheetjs.com/)** - Excel file generation

## 📁 Project Structure

\`\`\`
budget-calculator/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and theme tokens
├── components/
│   ├── budget-calculator.tsx   # Main calculator component
│   ├── budget-table.tsx        # Income/expense table component
│   ├── budget-charts.tsx       # Visualization components
│   └── period-selector.tsx     # Weekly/monthly toggle
├── hooks/
│   └── use-budget-data.ts      # Custom hook for data management
├── lib/
│   └── excel-export.ts         # Excel export functionality
├── types/
│   └── budget.ts               # TypeScript type definitions
└── README.md
\`\`\`

## 🎨 Design Features

- **Color-coded Cards**: Teal for income, orange for expenses, blue for savings
- **Hover Effects**: Smooth shadow transitions on interactive elements
- **Modern Charts**: Distinct colors for easy data interpretation
  - Bar Chart: Indigo (planned) and Emerald (actual)
  - Line Chart: Violet (planned), Cyan (actual), Amber (difference)
- **Responsive Layout**: Two-column layout on desktop, stacked on mobile
- **Sticky Visualizations**: Charts remain visible while scrolling on larger screens

## 💾 Data Storage

All budget data is stored in your browser's local storage:
- Data persists across browser sessions
- No server or database required
- Data is stored separately for weekly and monthly periods
- Clear your browser data to reset the calculator

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Local storage has a size limit (~5-10MB depending on browser)
- Data is not synced across devices
- Excel export requires modern browser support

## 🔮 Future Enhancements

- [ ] Cloud sync for multi-device access
- [ ] Budget templates for different scenarios
- [ ] Historical data comparison
- [ ] Budget goals and alerts
- [ ] PDF export option
- [ ] Multi-currency support

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Next.js and React
