import AreaChart from "./components/charts/areachart";
import ColumnChart from "./components/charts/columnchart";
import DonutChart from "./components/charts/donutchart";
import LineChart from "./components/charts/linechart";
import PieChart from "./components/charts/piechart";
import RadialChart from "./components/charts/radialchart";
import AreaChartFW from "./components/charts/areachartFW";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import db from "~/services/db";
import { authenticator } from "~/services/auth.server";
import { SetStateAction, useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const presupuesto = await db.presupuesto.findMany({
        where: {
            usuarioId: user.id,
        },
        cacheStrategy: { ttl: 60 },
    });
    const evento = await db.evento.findMany({
        where: {
            usuarioId: user.id,
        },
        cacheStrategy: { ttl: 60 },
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
        include: {
            ordenDeEntrada: true,
        },
        cacheStrategy: { ttl: 60 },
    });

    const cliente = await db.cliente.findMany({
        where: {
            usuarioId: user.id,
        },
    })
    const ordenDeEntrada = await db.ordenDeEntrada.findMany({
        where: {
            usuarioId: user.id,
        },
        cacheStrategy: { ttl: 60 },
    });
    const data = { presupuesto, entrada, evento, cliente, ordenDeEntrada }
    return json({data});
}
interface DataItem {
    [key: string]: any;
}
export default function DashboardIndex() {
    const fetchedData = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const [data, setData] = useState<DataItem[]>([fetchedData]); 
    // console.log(data)

    const updateData = (newData: DataItem) => {
        setData(Array.from(newData as DataItem[]));
        const formData = new FormData();

        for (const key in newData[newData.length - 1]) {
            formData.append(key, newData[newData.length - 1][key]);
        }
        submit(formData, { method: "post" }); 
    };

    return (
        <div className="p-8">
            {/* Resumen Financiero - independiente */}
            <div className="mb-8">
                <h2 className="text-xl text-[#2b2c34] font-semibold mb-4">Resumen Financiero</h2>
                <div className="flex flex-row items-center h-fit w-auto gap-8">
                    {/* <AreaChartFW dataNumber={dataNumber} dataDate={dataDate} totalSales={totalSales} /> */}
                    <AreaChartFW data={data} setData={updateData} />
                    <ColumnChart data={data} setData={updateData} />
                </div>
            </div>

            {/* Gráficos en cuadrícula */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Actividad de Eventos */}
                <div className="h-fit flex flex-col items-center justify-center space-y-4 ">
                    <h2 className="text-xl text-[#2b2c34] font-semibold mb-4">Actividad de Eventos</h2>
                    <LineChart data={data} setData={updateData} />
                    <ColumnChart data={data} setData={updateData}/>
                </div>

                {/* Clientes y Participación */}
                <div className="h-fit flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-xl text-[#2b2c34] font-semibold mb-4">Clientes y Participación</h2>
                    <DonutChart data={data} setData={updateData}/>
                    <PieChart data={data} setData={updateData}/>
                </div>

                {/* Servicios y Utilización */}
                <div className="h-fit flex flex-col items-center justify-center space-y-4">
                    <h2 className="text-xl text-[#2b2c34] font-semibold mb-4">Servicios y Utilización</h2>
                    <RadialChart data={data} setData={updateData}/>
                    <AreaChart data={data} setData={updateData} />
                </div>
            </div>
        </div>

    )
}
