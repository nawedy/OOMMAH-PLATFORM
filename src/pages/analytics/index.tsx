import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExportButton } from '@/components/ExportButton';
import { ChartTypeSelector } from '@/components/ChartTypeSelector';
import io from 'socket.io-client';

async function fetchAnalyticsData(startDate: string, endDate: string) {
  const response = await fetch(`/api/analytics?startDate=${startDate}&endDate=${endDate}`);
  if (!response.ok) {
    throw new Error('Failed to fetch analytics data');
  }
  return response.json();
}

export default function AnalyticsDashboard() {
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date()
  ]);
  const [chartTypes, setChartTypes] = useState({
    userGrowth: 'line',
    contentDistribution: 'pie',
    engagementByFeature: 'bar',
    userRetention: 'line',
    averageTimeSpent: 'line',
    conversionRates: 'bar'
  });

  const { data: analyticsData, isLoading, error, refetch } = useQuery(
    ['analytics', dateRange[0], dateRange[1]],
    () => fetchAnalyticsData(
      dateRange[0]?.toISOString().split('T')[0] || '',
      dateRange[1]?.toISOString().split('T')[0] || ''
    ),
    { enabled: !!dateRange[0] && !!dateRange[1] }
  );

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleChartTypeChange = (metric: string, chartType: string) => {
    setChartTypes(prevTypes => ({ ...prevTypes, [metric]: chartType }));
  };

  useEffect(() => {
    const socket = io();

    socket.on('analytics_update', (updatedData) => {
      // Update the analytics data in real-time
      queryClient.setQueryData(['analytics', dateRange[0], dateRange[1]], updatedData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {(error as Error).message || 'An error occurred while fetching analytics data.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="mb-6 flex justify-between items-center">
        <DateRangePicker
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={handleDateRangeChange}
        />
        <div className="flex space-x-2">
          <Button onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Refresh Data'}
          </Button>
          <ExportButton data={analyticsData} />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : analyticsData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <ChartTypeSelector
                currentType={chartTypes.userGrowth}
                onTypeChange={(type) => handleChartTypeChange('userGrowth', type)}
              />
            </CardHeader>
            <CardContent>
              {chartTypes.userGrowth === 'line' ? (
                <LineChart data={analyticsData.userGrowth} />
              ) : (
                <BarChart data={analyticsData.userGrowth} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
              <ChartTypeSelector
                currentType={chartTypes.contentDistribution}
                onTypeChange={(type) => handleChartTypeChange('contentDistribution', type)}
              />
            </CardHeader>
            <CardContent>
              {chartTypes.contentDistribution === 'pie' ? (
                <PieChart data={analyticsData.contentDistribution} />
              ) : (
                <BarChart data={analyticsData.contentDistribution} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Engagement by Feature</CardTitle>
              <ChartTypeSelector
                currentType={chartTypes.engagementByFeature}
                onTypeChange={(type) => handleChartTypeChange('engagementByFeature', type)}
              />
            </CardHeader>
            <CardContent>
              {chartTypes.engagementByFeature === 'bar' ? (
                <BarChart data={analyticsData.engagementByFeature} />
              ) : (
                <LineChart data={analyticsData.engagementByFeature} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
              <ChartTypeSelector
                currentType={chartTypes.userRetention}
                onTypeChange={(type) => handleChartTypeChange('userRetention', type)}
              />
            </CardHeader>
            <CardContent>
              {chartTypes.userRetention === 'line' ? (
                <LineChart data={analyticsData.userRetention} />
              ) : (
                <BarChart data={analyticsData.userRetention} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Time Spent</CardTitle>
              <ChartTypeSelector
                currentType={chartTypes.averageTimeSpent}
                onTypeChange={(type) => handleChartTypeChange('averageTimeSpent', type)}
              />
            </CardHeader>
            <CardContent>
              {chartTypes.averageTimeSpent === 'line' ? (
                <LineChart data={analyticsData.averageTimeSpent} />
              ) : (
                <BarChart data={analyticsData.averageTimeSpent} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rates</CardTitle>
              <ChartTypeSelector
                currentType={chartTypes.conversionRates}
                onTypeChange={(type) => handleChartTypeChange('conversionRates', type)}
              />
            </CardHeader>
            <CardContent>
              {chartTypes.conversionRates === 'bar' ? (
                <BarChart data={analyticsData.conversionRates} />
              ) : (
                <LineChart data={analyticsData.conversionRates} />
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Alert>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>
            No analytics data available for the selected date range.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

