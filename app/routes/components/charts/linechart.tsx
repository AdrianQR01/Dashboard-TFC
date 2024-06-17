import { useState, useEffect } from 'react';

interface DataItem {
  [key: string]: any;
}

interface TablaTestProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

export default function LineChart({ data, setData }: TablaTestProps) {
  const totalEnProgreso = data[0].data.evento.reduce((acc:any, item:any) => item.estadoEvento === 'En progreso' ? acc + 1 : acc, 0);
  const totalTerminados = data[0].data.evento.reduce((acc:any, item:any) => item.estadoEvento === 'Terminado' ? acc + 1 : acc, 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Chart, setApexchart]: any = useState();
  useEffect(() => {
    import('react-apexcharts').then((d) => setApexchart(() => d.default));
  }, []);

  const options = {
    chart: {
      height: '100%',
      maxWidth: '100%',
      type: 'line',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
      curve: 'smooth',
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -26,
      },
    },
    series: [
      {
        name: 'En progreso',
        data: [0, totalEnProgreso],
        color: '#1A56DB',
      },
      {
        name: 'Finalizado',
        data: [0, totalTerminados],
        color: '#7E3AF2',
      },
    ],
    legend: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5],
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
  };

  // Función para exportar los datos a un archivo CSV
  const exportToCSV = () => {
    // Procesar los datos en un formato CSV adecuado
    let csvData = 'Estado,Total\n';
    csvData += `En progreso,${totalEnProgreso}\n`;
    csvData += `Finalizado,${totalTerminados}\n`;

    // Crear un Blob con los datos CSV
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace y hacer clic en él para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eventos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return !Chart ? (
    <></>
  ) : (
    <div className="max-w-sm bg-[#fffffe] rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <div className="grid gap-4 grid-cols-2">
          <div>
            <h1 className="inline-flex content-center items-center text-[#2b2c34] dark:text-[#00214d] leading-none font-normal mb-2">
              En progreso
            </h1>
            <h2 className="text-gray-900 dark:text-white text-2xl leading-none font-bold">
              {totalEnProgreso}
            </h2>
          </div>
          <div>
            <h1 className="inline-flex items-center text-[#2b2c34] dark:text-gray-400 leading-none font-normal mb-2">
              Finalizados
            </h1>
            <h2 className="text-gray-900 dark:text-white text-2xl leading-none font-bold">
              {totalTerminados}
            </h2>
          </div>
        </div>
      </div>
      <Chart type={options.chart.type} options={options} series={options.series} />
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
        <div className="pt-5">
          <button
            onClick={exportToCSV}
            className="px-5 py-2.5 text-sm font-medium text-[#fffffe] inline-flex items-center bg-[#6246ea] hover:bg-[#6246ea] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-[#6246ea] dark:hover:[#6246ea] dark:focus:ring-blue-800"
          >
            <svg
              className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
            Exportar eventos
          </button>
        </div>
      </div>
    </div>
  );
}
