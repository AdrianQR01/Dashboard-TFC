import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

interface DataItem {
  [key: string]: any;
}

interface TablaTestProps {
  data: DataItem[];
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

export default function AreaChart({ data, setData }: TablaTestProps) {
  const [Chart, setApexchart]: any = useState();

  useEffect(() => {
    import('react-apexcharts').then((d) => setApexchart(() => d.default));
  }, []);
  const totalPedidos = data[0]?.data?.ordenDeEntrada
    .flatMap((element: any) => element)
    .reduce((acc: any, item: any) => acc + item.cantidad, 0);
  console.log(totalPedidos)

  const options = {
    chart: {
      height: '100%',
      maxWidth: '100%',
      type: 'area',
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
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2'],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: 'Pedidos totales',
        data: [0, totalPedidos],
        color: '#1A56DB',
      },
    ],
    xaxis: {
      categories: [
        '01 February',
        '02 February',
        '03 February',
        '04 February',
        '05 February',
        '06 February',
        '07 February',
      ],
      labels: {
        show: false,
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

  console.log(data)
  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text('Cantidad de Pedidos', 14, 15);
    data.forEach((entry: any) => {
      y += 10;
      doc.text(`${totalPedidos}`, 14, y);
    });

    doc.save('reporte_pedidos.pdf');
  };

  return !Chart ? (
    <></>
  ) : (
    <div className="max-w-sm bg-[#fffffe] rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="leading-none text-3xl font-bold text-[#00214d] dark:text-[#00214d] pb-2">
            {totalPedidos}
          </h1>
          <p className="text-base font-normal text-[#1b2d45] dark:text-[#1b2d45]">
            Pedidos totales
          </p>
        </div>
      </div>
      <Chart type={options.chart.type} options={options} series={options.series} />
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            onClick={exportToPDF}
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-[#6246ea] hover:text-[#6246ea] dark:hover:text-[#6246ea] hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Exportar a PDF
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
