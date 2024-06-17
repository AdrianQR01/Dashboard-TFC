import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface DataItem {
  [key: string]: any;
}

interface TablaTestProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

export default function AreaChartFW({ data, setData }: TablaTestProps) {
  const dataNumber: { [key: string]: number } = {};
  const dataDate: { [key: string]: string } = {};
  const dataDateLine: { [key: string]: string } = {};

  data[0].data.presupuesto.forEach((value: { total: number; fechaInicio: string }, key: string | number) => {
    dataNumber[key] = value.total;
    dataDate[key] = value.fechaInicio;
  });

  data[0].data.evento.forEach((value: { fecha: string }, key: string | number) => {
    dataDateLine[key] = value.fecha;
  });

  const totalSales = data[0].data.entrada.reduce((acc: number, curr: { precio: number }) => acc + curr.precio, 0);

  console.log("Data 0: ", data[0].data.entrada);

  let firstHalf = data[0].data.entrada.slice(0, Math.floor(data[0].data.entrada.length / 2));
  console.log("Data first: ", firstHalf);
  let secondHalf = data[0].data.entrada.slice(Math.floor(data[0].data.entrada.length / 2));
  console.log("Data second: ", secondHalf);

  let totalSalesFirstHalf = firstHalf.reduce((acc: number, curr: { precio: number }) => acc + curr.precio, 0);
  console.log("Data totalfirst: ", totalSalesFirstHalf);

  let totalSalesSecondHalf = secondHalf.reduce((acc: number, curr: { precio: number }) => acc + curr.precio, 0);
  console.log("Data totalfsecond: ", totalSalesSecondHalf);

  let percentageChange;
  if (totalSalesFirstHalf === 0) {
    percentageChange = totalSalesSecondHalf !== 0 ? 100 : 0;
  } else {
    percentageChange = ((totalSalesSecondHalf - totalSalesFirstHalf) / totalSalesFirstHalf) * 100;
  }
  console.log("percentage: ", percentageChange);

  const [Chart, setApexchart]: any = useState();
  useEffect(() => {
    import('react-apexcharts').then((d) =>
      setApexchart(() => d.default)
    );
  }, []);

  const options = {
    chart: {
      height: '100%',
      width: '100%',
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    tooltip: {
      enabled: true,
      x: {
        show: false
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2']
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 6
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      }
    },
    series: [
      {
        name: 'Ingresos totales',
        data: [0, totalSales],
        color: '#1A56DB'
      }
    ],
    xaxis: {
      categories: Object.values(dataDate),
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    }
  };

  return !Chart
    ? (
      <></>
    )
    : (
      <div className="w-full bg-[#fffffe] rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="leading-none text-3xl font-bold text-[#00214d] dark:text-white pb-2">{
              (totalSales).toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR',
              })}
            </h1>
            <p className="text-base font-normal text-[#2b2c34] dark:text-gray-400">Ingresos totales</p>
          </div>
          <div
            className="flex items-center px-2.5 py-0.5 text-base font-semibold text-[#0D8763] dark:text-green-500 text-center">
            {percentageChange.toFixed() + "%"}
            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
          </div>
        </div>
        <Chart
          type={options.chart.type}
          options={options}
          series={options.series}
          height="100%"
          width="100%"
        />
      </div>
    );
}
