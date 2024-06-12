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
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const presupuesto = await db.presupuesto.findMany({
        where: {
            usuarioId: user.id,
        },
    });
    const evento = await db.evento.findMany({
        where: {
        },
    });
    const entrada = await db.entrada.findMany({
        where: {
            usuarioId: user.id,
        },
        orderBy: {
            evento: {
                fecha: "asc",
            },
        },
    });
    return json({ presupuesto, entrada, evento });
}

export default function DashboardIndex() {
    const fetchedData = useLoaderData<typeof loader>();
    const dataNumber: any = {};
    const dataDate: any = {};
    const dataDateLine: any = {};

    fetchedData.presupuesto.forEach(function (value, key) {
        dataNumber[key] = value.total;
    });
    fetchedData.presupuesto.forEach(function (value, key) {
        dataDate[key] = value.fechaInicio;
    });
    fetchedData.evento.forEach(function (value, key) {
        dataDateLine[key] = value.fecha;
    });

    console.log("fechas", dataDateLine)

    let totalSales = fetchedData.entrada.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.precio;
    }, 0);
    console.log("Total de ventas:", totalSales);

    // Dividir el array de ventas en dos intervalos de tiempo
    let firstHalf = fetchedData.entrada.slice(0, Math.floor(fetchedData.entrada.length / 2));
    let secondHalf = fetchedData.entrada.slice(Math.floor(fetchedData.entrada.length / 2));

    // Calcular el total de ventas para cada intervalo de tiempo
    let totalSalesFirstHalf = firstHalf.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.precio;
    }, 0);

    let totalSalesSecondHalf = secondHalf.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.precio;
    }, 0);

    // Calcular el porcentaje de cambio entre los dos intervalos de tiempo
    let percentageChange = ((totalSalesSecondHalf - totalSalesFirstHalf) / totalSalesFirstHalf) * 100;
    console.log("Porcentaje de cambio entre los dos intervalos de tiempo:", percentageChange);

    let totalEventos = fetchedData.evento.length
    console.log("cantidad de eventos:",totalEventos)

    return (
        <div className="p-8">
            {/* Resumen Financiero - independiente */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Resumen Financiero</h2>
                <div className="flex flex-row items-center h-fit w-auto gap-8">
                    <AreaChartFW dataNumber={dataNumber} dataDate={dataDate} totalSales={totalSales} />
                    <ColumnChart />
                </div>
            </div>

            {/* Gráficos en cuadrícula */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Actividad de Eventos */}
                <div className="h-fit flex flex-col items-center justify-center space-y-4 ">
                    <h2 className="text-xl font-semibold mb-4">Actividad de Eventos</h2>
                    <LineChart dataDateLine={dataDateLine} />
                    <ColumnChart />
                </div>

                {/* Clientes y Participación */}
                <div className="h-fit flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Clientes y Participación</h2>
                    <DonutChart />
                    <PieChart />
                </div>

                {/* Servicios y Utilización */}
                <div className="h-fit flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Servicios y Utilización</h2>
                    <RadialChart />
                    <AreaChart />
                </div>
            </div>
        </div>

    )
}
