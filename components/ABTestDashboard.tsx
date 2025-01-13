import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Select } from '@/components/ui/select';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ABTestDashboard: React.FC = () => {
  const [results, setResults] = useState<any>({ overall: [], trend: [] });
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedMetric, setSelectedMetric] = useState('clickThroughRate');

  useEffect(() => {
    fetchResults();
  }, [dateRange]);

  const fetchResults = async () => {
    const [startDate, endDate] = dateRange;
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('startDate', startDate.toISOString());
    if (endDate) queryParams.append('endDate', endDate.toISOString());

    const response = await fetch(`/api/ab-test-results?${queryParams.toString()}`);
    const data = await response.json();
    setResults(data);
  };

  const chartData = {
    labels: results.overall.map((r: any) => r.strategy),
    datasets: [
      {
        label: getMetricLabel(selectedMetric),
        data: results.overall.map((r: any) => r[selectedMetric]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `A/B Test Results: ${getMetricLabel(selectedMetric)} by Strategy`,
      },
    },
  };

  const trendData = {
    labels: results.trend.map((r: any) => new Date(r.date).toLocaleDateString()),
    datasets: results.overall.map((strategy: any) => ({
      label: strategy.strategy,
      data: results.trend.map((t: any) => t[strategy.strategy][selectedMetric]),
      fill: false,
    })),
  };

  const trendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${getMetricLabel(selectedMetric)} Trend Over Time`,
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">A/B Test Dashboard</h2>
      <div className="mb-4 flex space-x-4">
        <DateRangePicker
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(dates) => setDateRange(dates)}
        />
        <Select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          <option value="clickThroughRate">Click-through Rate</option>
          <option value="conversionRate">Conversion Rate</option>
          <option value="averageTimeSpent">Average Time Spent</option>
        </Select>
      </div>
      <div className="mb-8">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mb-8">
        <Line data={trendData} options={trendOptions} />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Strategy</th>
            <th className="border border-gray-300 p-2">Click-through Rate</th>
            <th className="border border-gray-300 p-2">Conversion Rate</th>
            <th className="border border-gray-300 p-2">Avg. Time Spent</th>
            <th className="border border-gray-300 p-2">Total Impressions</th>
            <th className="border border-gray-300 p-2">Total Clicks</th>
          </tr>
        </thead>
        <tbody>
          {results.overall.map((result: any, index: number) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border border-gray-300 p-2">{result.strategy}</td>
              <td className="border border-gray-300 p-2">{(result.clickThroughRate * 100).toFixed(2)}%</td>
              <td className="border border-gray-300 p-2">{(result.conversionRate * 100).toFixed(2)}%</td>
              <td className="border border-gray-300 p-2">{result.averageTimeSpent.toFixed(2)} seconds</td>
              <td className="border border-gray-300 p-2">{result.totalImpressions}</td>
              <td className="border border-gray-300 p-2">{result.totalClicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getMetricLabel(metric: string): string {
  switch (metric) {
    case 'clickThroughRate':
      return 'Click-through Rate';
    case 'conversionRate':
      return 'Conversion Rate';
    case 'averageTimeSpent':
      return 'Average Time Spent';
    default:
      return metric;
  }
}

export default ABTestDashboard;

