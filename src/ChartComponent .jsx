import  { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  "2024": {
    "January": { "sales": 1000, "expenses": 500, "profit": 500 },
    "February": { "sales": 1200, "expenses": 600, "profit": 600 },
    "March": { "sales": 1500, "expenses": 700, "profit": 800 },
    "April": { "sales": 1300, "expenses": 650, "profit": 650 },
    "May": { "sales": 1600, "expenses": 800, "profit": 800 },
    "June": { "sales": 1700, "expenses": 850, "profit": 850 },
    "July": { "sales": 1800, "expenses": 900, "profit": 900 },
    "August": { "sales": 1900, "expenses": 950, "profit": 950 },
    "September": { "sales": 2000, "expenses": 1000, "profit": 1000 },
    "October": { "sales": 2100, "expenses": 1050, "profit": 1050 },
    "November": { "sales": 2200, "expenses": 1100, "profit": 1100 },
    "December": { "sales": 2300, "expenses": 1150, "profit": 1150 }
  }
};

const ChartComponent = () => {
  const [selectedMonths, setSelectedMonths] = useState(["January", "February", "March", "April"]);

  const handleMonthSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMonths([...selectedMonths, value]);
    } else {
      setSelectedMonths(selectedMonths.filter(month => month !== value));
    }
  };

  const chartData = {
    labels: selectedMonths,
    datasets: [
      {
        label: 'Sales',
        data: selectedMonths.map(month => data["2024"][month].sales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Expenses',
        data: selectedMonths.map(month => data["2024"][month].expenses),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Profit',
        data: selectedMonths.map(month => data["2024"][month].profit),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
          afterLabel: function(context) {
            const month = context.label;
            const sales = data["2024"][month].sales;
            const expenses = data["2024"][month].expenses;
            const profit = data["2024"][month].profit;
            return `Sales: ${sales}, Expenses: ${expenses}, Profit: ${profit}`;
          }
        }
      }
    }
  };

  return (
    <div>
      <div>
        {Object.keys(data["2024"]).map(month => (
          <div key={month}>
            <input
              type="checkbox"
              id={month}
              value={month}
              checked={selectedMonths.includes(month)}
              onChange={handleMonthSelection}
            />
            <label htmlFor={month}>{month}</label>
          </div>
        ))}
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
