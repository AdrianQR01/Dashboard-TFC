import { useState, useEffect } from 'react'

export default function AreaChartFW () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Chart, setApexchart]:any = useState()
  useEffect(() => {
    import('react-apexcharts').then((d) =>
      setApexchart(() => d.default)
    )
  }, [])
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
        name: 'New users',
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: '#1A56DB'
      }
    ],
    xaxis: {
      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
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
  }
  return !Chart
    ? (
    <></>
      )
    : (
      <div className="w-full bg-[#fffffe] rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h1 className="leading-none text-3xl font-bold text-[#00214d] dark:text-white pb-2">$12k</h1>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Generado en ventas</p>
          </div>
          <div
            className="flex items-center px-2.5 py-0.5 text-base font-semibold text-[#0D8763] dark:text-green-500 text-center">
            2%
            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
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
      )
}
