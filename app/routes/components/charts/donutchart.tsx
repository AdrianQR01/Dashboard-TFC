import { useState, useEffect } from 'react'

interface DataItem {
    [key: string]: any;
  }
  
  interface TablaTestProps {
    data: DataItem[];
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  }
  

export default function DonutChart({ data, setData }: TablaTestProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalClientes = data[0].data.cliente.length
    const [Chart, setApexchart]: any = useState()
    useEffect(() => {
        import('react-apexcharts').then((d) =>
            setApexchart(() => d.default)
        )
    }, [])

    const options = {
        series: [35.1, totalClientes],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
        chart: {
            height: "100%",
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["transparent"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: 20,
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Visitas",
                            fontFamily: "Inter, sans-serif",
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                        },
                    },
                    size: "80%",
                },
            },
        },
        grid: {
            padding: {
                top: -2,
            },
        },
        labels: ["Usuarios", "Clientes"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
        yaxis: {
            labels: {
            },
        },
        xaxis: {
            labels: {
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        }
    }

    return !Chart
        ? (
            <></>
        )
        : (
            <div className="max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

                <div className="flex justify-between mb-3">
                    <div className="flex justify-center items-center">
                        <h1 className="text-xl font-bold leading-none text-[#2b2c34] dark:text-white pe-1">Trafico de la pagina</h1>
                    </div>
                </div>
                <Chart className="py-6"
                    type={options.chart.type}
                    options={options}
                    series={options.series}
                />

                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                    <div className="flex justify-between items-center pt-5">
                    </div>
                </div>
            </div>

        )
}