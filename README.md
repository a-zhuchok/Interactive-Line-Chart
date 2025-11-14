# Test Assignment: Interactive Line Chart

https://a-zhuchok.github.io/Interactive-Line-Chart/

# Implementation

### Required Features 

- **Conversion Rate Calculation**: Calculates and displays conversion rate as `(conversions / visits) * 100` for all variations
- **Line Chart Display**: Shows conversion rates as percentages for all selected variations
- **Hover Interaction**: Displays vertical reference line and tooltip popup with daily data on hover
- **Variation Selection**: Checkbox selector for choosing which variations to display
  - At least one variation is always selected (disabled state when only one remains)
- **Automatic Axis Adaptation**: Both X and Y axes automatically adjust when variations are toggled
  - Y-axis adapts to the data range of visible variations
  - X-axis adapts based on selected time range (Day/Week)
- **Percentage Display**: All values are displayed as percentages
- **Responsive Layout**: Supports screens from 671px to 1300px width
- **Day/Week Selector**: Toggle between daily and weekly aggregated views

### Bonus Features 

- **Zoom Control**: Enable/disable zoom functionality
- **Line Style Selector**: Choose between three styles:
  - **Line**: Straight line chart
  - **Smooth**: Curved line chart
  - **Area**: Area chart with fill
- **Light/Dark Theme Toggle**: Switch between light and dark color schemes
- **Export to PNG**: Export the chart as a PNG image

## Local Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-interview-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Recharts** - Charting library
- **CSS Modules** - Component styling
- **html2canvas** - PNG export 
