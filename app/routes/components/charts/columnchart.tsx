import { useState, useEffect } from 'react';

interface DataItem {
  [key: string]: any;
}

interface TablaTestProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

export default function ColumnChart({ data, setData }: TablaTestProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  console.log("datos column", data[0].ordenDeEntrada);
  const totalGanancias = data[0].ordenDeEntrada.reduce((acc: any, current: any) => {
    return acc + (current.cantidad * current.precio);
  }, 0);

  const [Chart, setApexchart]: any = useState();
  useEffect(() => {
    import('react-apexcharts').then((d) =>
      setApexchart(() => d.default)
    );
  }, []);

  // Procesar los datos para las series del gráfico
  const daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  const organicData = data[0].ordenDeEntrada.map((entry: any, index: number) => ({
    x: daysOfWeek[index % daysOfWeek.length], // Esto asume que los datos se repiten semanalmente
    y: entry.cantidad,
  }));

  const socialMediaData = data[0].ordenDeEntrada.map((entry: any, index: number) => ({
    x: daysOfWeek[index % daysOfWeek.length], // Esto asume que los datos se repiten semanalmente
    y: entry.precio,
  }));

  const options = {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'Organic',
        color: '#1A56DB',
        data: organicData,
      },
      {
        name: 'Social media',
        color: '#FDBA8C',
        data: socialMediaData,
      },
    ],
    chart: {
      type: 'bar',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadiusApplication: 'end',
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  // Función para exportar los datos a un archivo CSV
  const exportToCSV = () => {
    // Procesar los datos en un formato CSV adecuado
    let csvData = 'Day,Organic Quantity,Social Media Price\n';
    data[0].ordenDeEntrada.forEach((entry: any, index: number) => {
      const day = daysOfWeek[index % daysOfWeek.length];
      csvData += `${day},${entry.cantidad},${entry.precio}\n`;
    });

    // Crear un Blob con los datos CSV
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace y hacer clic en él para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return !Chart ? (
    <></>
  ) : (
    <div className="max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex content-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 19"
            >
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
          </div>
          <div>
            <h1 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
              {totalGanancias + ' €'}
            </h1>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Ventas realizadas
            </p>
          </div>
        </div>
      </div>
      <Chart type={options.chart.type} options={options} series={options.series} />
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            onClick={exportToCSV}
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Exportar datos
          </button>
        </div>
      </div>
    </div>
  );
}
