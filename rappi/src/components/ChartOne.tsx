import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAnalyticsData } from '../services/analyticsService';

const ChartOne: React.FC = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    getAnalyticsData().then((res) => {
      const dataMap = {
        day: res.data.ordersPerDay.map((d: any) => ({ label: d.date, count: d.count })),
        week: res.data.ordersPerWeek.map((d: any) => ({ label: d.week, count: d.count })),
        month: res.data.ordersPerMonth.map((d: any) => ({ label: d.month, count: d.count })),
      };

      const current = dataMap[period];
      setCategories(current.map((i) => i.label));
      setSeries([{ name: 'Pedidos', data: current.map((i) => i.count) }]);
    });
  }, [period]);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 335,
      fontFamily: 'Satoshi, sans-serif',
      toolbar: { show: false },
    },
    colors: ['#3C50E0'],
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      categories: categories,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3'],
      strokeWidth: 3,
    },
    tooltip: {
      x: {
        format: period === 'day' ? 'dd MMM' : undefined,
      },
      y: {
        formatter: (val) => `${val} pedidos`,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Pedidos por {period === 'day' ? 'Día' : period === 'week' ? 'Semana' : 'Mes'}
        </h5>
        <div className="inline-flex gap-2">
          {['day', 'week', 'month'].map((p) => (
            <button
              key={p}
              className={`py-1 px-3 text-xs font-medium rounded ${
                period === p
                  ? 'bg-primary text-white'
                  : 'bg-white text-black dark:bg-meta-4 dark:text-white'
              }`}
              onClick={() => setPeriod(p as 'day' | 'week' | 'month')}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ChartOne;
