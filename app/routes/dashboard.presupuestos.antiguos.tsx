import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import db from "~/services/db";

interface DataItem {
    id: number;
    estado: string;
    nombrePresupuesto: string;
    fechaInicio: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const data = await db.presupuesto.findMany({
        where: {},
    });
    return json(data);
}

export default function Antiguos() {
    const fetchedData = useLoaderData<typeof loader>();

    // Calcular la fecha límite (2 meses atrás)
    const dateLimit = new Date();
    dateLimit.setMonth(dateLimit.getMonth() - 12);

    // Filtrar los datos para obtener solo los que tienen fechaInicio anterior a la fecha límite y estado "Terminado" o "Cancelado"
    const filteredData = fetchedData.filter((item: DataItem) => 
        new Date(item.fechaInicio) < dateLimit && 
        (item.estado === "Finalizado" || item.estado === "Cancelado")
    );

    return (
        <>
            <div className="flex flex-wrap flex-1">
                <div className="flex flex-col md:flex-row gap-4 w-full h-full">
                    <div className="relative w-full">
                        <div className="text-2xl p-4 font-bold">Resumen del Presupuesto</div>
                        {filteredData.map((item: DataItem) => (
                            <div key={item.id} className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="https://picsum.photos/200/200" alt="Profile image" />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{item.nombrePresupuesto}</div>
                                    <div className="font-normal text-gray-500">{item.estado}</div>
                                </div>
                                <div className="ml-auto">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
