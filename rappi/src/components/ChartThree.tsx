import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAnalyticsData } from '../services/analyticsService';
// Colores y etiquetas que se usan en el gráfico y leyenda
const COLORS = ['#10B981', '#375E83', '#259AE6', '#FFA70B'];
const LABELS = ['pending', 'on_route', 'completed', 'cancelled'];

const options: ApexOptions = {
  chart: {
    type: 'donut',
  },
  colors: COLORS,
  labels: LABELS,
  legend: {
    show: true,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '12%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [percentages, setPercentages] = useState<number[]>([]);

  useEffect(() => {
    getAnalyticsData()
      .then((res) => {
        const data = res.data.ordersByStatus;

        // Convertimos el objeto en arreglo de valores ordenados según las etiquetas
        const values = LABELS.map((key) => data[key] || 0);
        const total = values.reduce((sum, val) => sum + val, 0);

        const perc = values.map((v) =>
          total > 0 ? Math.round((v / total) * 100) : 0,
        );

        setSeries(values);
        setPercentages(perc);
      })
      .catch((err) => {
        console.error('Error loading analytics data:', err);
      });
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 sm:flex justify-between gap-4">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Pedidos por Estado
        </h5>
      </div>

      <div className="mb-2 flex justify-center">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {LABELS.map((label, i) => (
          <div key={i} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{ backgroundColor: COLORS[i] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white capitalize">
                <span>{label.replace('_', ' ')}</span>
                <span>{percentages[i] ?? 0}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
