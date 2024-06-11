import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import AreaChartFW from "./components/charts/areachartFW"
import { Cards } from "./components/services/CardServices"
import db from "~/services/db"
import { useLoaderData } from "@remix-run/react"
import { useState } from 'react';


export const meta: MetaFunction = () => {
    return [
        { title: 'Servicios' },
        { name: 'description', content: 'This is the login page' }
    ]
}
export async function loader({ request }: LoaderFunctionArgs) {
    const presupuesto = await db.presupuesto.findMany({
        where: {},
    });
    const entrada = await db.entrada.findMany({
        where: {},
    });
    return json({presupuesto, entrada});
}

export default function Servicios() {
    const fetchedData = useLoaderData<typeof loader>();
    const dataNumber:any = {};
    const dataDate:any = {};
    
    fetchedData.presupuesto.forEach(function (value, key) {
        dataNumber[key] = value.total;
    });
    fetchedData.presupuesto.forEach(function (value, key) {
        dataDate[key] = value.fechaInicio;
    });
    let totalSales = fetchedData.entrada.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.precio;
    }, 0);
    console.log(fetchedData.entrada)

    return (
        <div className="flex flex-col h-fit sm:h-screen w-auto p-4">
            {/* Top row */}
            <div className="flex justify-center bg-[#222E3A]/[4%] rounded-lg w-full">
                <div className="flex flex-col items-center sm:items-start sm:h-fit sm:flex-row mb-2 w-full">
                    <div className="w-full sm:w-full">
                        <div className="w-full"><AreaChartFW dataNumber={dataNumber} dataDate={dataDate} totalSales={totalSales}/></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex w-full flex-row flex-wrap flex-1">
                <div className="flex flex-wrap p-4 flex-row justify-center w-fit h-fit">
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                </div>
            </div>
        </div>
    )
}