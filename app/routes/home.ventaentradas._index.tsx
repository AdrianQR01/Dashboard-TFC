import { LoaderFunctionArgs, json } from '@remix-run/node';
import db from '~/services/db';
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from 'react';
interface DataItem {
    [key: string]: any;
}
export async function loader({ request }: LoaderFunctionArgs) {

    const eventos = await db.evento.findMany({
        where: {
        },
        include: {
            entradas: true
        },
        cacheStrategy: { ttl: 60 },
    });
    const data = { eventos }
    return json({data});
}
export default function VentaEntradasIndex() {
    const fetchedData = useLoaderData<typeof loader>();
    const [data, setData] = useState<DataItem[]>([fetchedData]);
    const eventos = data[0].data.eventos
    return (
        <div className="relative container mx-auto p-4 mt-[69px]">
        <div className="grid grid-cols-1 gap-4">
            {eventos.map((evento:any) => (
                <div key={evento.id} className="bg-white bg-opacity-75 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center md:items-center">
                    <img src="https://random-image-pepebigotes.vercel.app/api/random-image" alt={evento.nombre} className="w-32 h-32 object-cover rounded-lg md:mr-6 mb-4 md:mb-0" />
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-2">{evento.nombre}</h2>
                        <p className="text-gray-600">{evento.fecha}</p>
                        <p>Quedan {evento.entradas.filter((entrada:any) => entrada.estadoEntrada === "En venta").length} de {evento.entradas.length} entradas</p>
                    </div>
                    <Link to={`${evento.id}`}>
                        <button className="mt-4 md:mt-0 md:ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Comprar Entradas
                        </button>
                    </Link>

                </div>
            ))}
        </div>
    </div>
    )
}