import AreaChart from "./components/charts/areachart";
import ColumnChart from "./components/charts/columnchart";
import DonutChart from "./components/charts/donutchart";
import LineChart from "./components/charts/linechart";
import PieChart from "./components/charts/piechart";
import RadialChart from "./components/charts/radialchart";
import AreaChartFW from "./components/charts/areachartFW";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/services/db";

export async function loader({ request }: LoaderFunctionArgs) {
    const presupuesto = await db.presupuesto.findMany({
        where: {},
    });
    const entrada = await db.entrada.findMany({
        where: {},
    });
    return json({ presupuesto, entrada });
}

export default function DashboardIndex() {
    const fetchedData = useLoaderData<typeof loader>();
    const dataNumber: any = {};
    const dataDate: any = {};

    fetchedData.presupuesto.forEach(function (value, key) {
        dataNumber[key] = value.total;
    });
    fetchedData.presupuesto.forEach(function (value, key) {
        dataDate[key] = value.fechaInicio;
    });
    let totalSales = fetchedData.entrada.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.precio;
    }, 0);
    let previousTotalSales = 1000
    let percentage = previousTotalSales > 0 ? ((totalSales - previousTotalSales) / previousTotalSales) * 100 : 0;
    previousTotalSales = totalSales;
    console.log(previousTotalSales)


    const tags = [
        <LineChart key='line' />,
        <AreaChart key='area' />,
        <ColumnChart key='column' />,
        <PieChart key='pie' />,
        <RadialChart key='radial' />,
        <DonutChart key='donut' />
    ]
    return (
        <div className="flex justify-center flex-wrap items-stretch content-center p-8 w-fit">
            <AreaChartFW dataNumber={dataNumber} dataDate={dataDate} totalSales={totalSales}/>
            {tags.map((tag, index) => (
                <div key={index} className={'m-2'}>
                    {tag}
                </div>
            ))}
        </div>
    )
}