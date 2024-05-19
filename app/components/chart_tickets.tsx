import { useState, useEffect } from 'react'

export default function ChartTickets() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Chart, setApexchart]: any = useState()
    useEffect(() => {
        import('react-apexcharts').then((d) =>
            setApexchart(() => d.default)
        )
    }, [])
    const options = {
        series: [42, 47, 52, 58, 65],
        chart: {
            width: 380,
            type: 'polarArea'
        },
        labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        yaxis: {
            show: false
        },
        legend: {
            show: false,
            position: 'bottom'
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.9
            }
        }
    }
    // Opciones para el gráfico de Entradas Vendidas
    const optionsVendidas = {
        series: [{
            name: 'Entradas Vendidas',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        },
        yaxis: {
            title: {
                text: 'Cantidad'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val: number) {
                    return val + " entradas";
                }
            }
        }
    }
    
    return !Chart
        ? (
            <></>
        )
        : (
            <div className='flex flex-row items-center'>
                <div className='border px-4 rounded-xl'>
                    <div className='flex-col mb-6'>
                        <h1 className='text-2xl font-bold dark:text-white'>Entradas totales</h1>
                        <h3 className='text-lg dark:text-white'>Precio total: 2000$</h3>

                    </div>
                    <div className="w-32 pl-6 mt-2">
                        <Chart
                            type={options.chart.type}
                            options={options}
                            series={options.series}
                            height="150"
                            width="100"
                        />
                    </div>
                </div>

                <div className='border px-4 rounded-xl'>
                    <h1 className='text-2xl font-bold dark:text-white'>Entradas Vendidas</h1>
                    <div className="w-64 pl-6 mt-2">
                        <Chart
                            type={optionsVendidas.chart.type}
                            options={optionsVendidas}
                            series={optionsVendidas.series}
                            height="160"
                        />
                    </div>
                </div>
            </div>
        )
}

