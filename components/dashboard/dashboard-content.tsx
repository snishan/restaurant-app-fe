'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CalendarCheck, ChefHat } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';
import dashboardData from '../../lib/data/dashboardData.json';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

export function DashboardContent() {
  const { cards, charts, table } = dashboardData;

  const revenueChartData = {
    labels: charts.revenue.labels,
    datasets: [
      {
        label: 'Revenue',
        data: charts.revenue.data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const customerChartData = {
    labels: charts.newCustomers.labels,
    datasets: [
      {
        label: 'New Customers',
        data: charts.newCustomers.data,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex-1 space-y-4">
      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index} className='bg-white/50 backdrop-blur-sm'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon === 'DollarSign' && <DollarSign className="h-4 w-4 text-muted-foreground" />}
              {card.icon === 'Users' && <Users className="h-4 w-4 text-muted-foreground" />}
              {card.icon === 'ChefHat' && <ChefHat className="h-4 w-4 text-muted-foreground" />}
              {card.icon === 'CalendarCheck' && <CalendarCheck className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
              <p className="text-xs text-muted-foreground">{card.percentageChange}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className='bg-white/50 backdrop-blur-sm'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={revenueChartData} />
          </CardContent>
        </Card>

        <Card className='bg-white/50 backdrop-blur-sm'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={customerChartData} />
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className='bg-white/50 backdrop-blur-sm'>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full table-auto text-sm text-muted-foreground">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{row.orderId}</td>
                  <td className="px-4 py-2">{row.customer}</td>
                  <td className="px-4 py-2">{row.amount}</td>
                  <td className="px-4 py-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
