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
    return !Chart
        ? (
            <></>
        )
        : (
            <div className='flex flex-row items-center border px-4 rounded-xl'> {/* Utiliza flex-col para alinear los elementos verticalmente */}
                <div className='flex-col mb-6'>
                    <h1 className='text-2xl font-bold dark:text-white'>Entradas totales</h1> {/* Agrega un margen inferior para separar el texto del gráfico */}
                    <h3 className='text-lg dark:text-white'>Precio total: 2000$</h3> {/* Agrega un margen inferior para separar el texto del gráfico */}

                </div>
                <div className="w-32 pl-6 mt-2"> {/* Asegúrate de que el gráfico ocupe todo el ancho */}
                    <Chart
                        type={options.chart.type}
                        options={options}
                        series={options.series}
                        height="150"
                    />
                </div>
            </div>
        )
}

