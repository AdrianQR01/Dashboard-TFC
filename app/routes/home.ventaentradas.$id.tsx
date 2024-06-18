import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import db from "~/services/db";
interface DataItem {
    [key: string]: any;
}
export async function loader({ params }: LoaderFunctionArgs) {
    const eventoId = params.id;
    const eventos = await db.evento.findMany({
        where: {
            id: Number(eventoId),
        },
        include: {
            entradas: true
        },
        cacheStrategy: { ttl: 60 },
    });
    const data = { eventos }
    return json({ data });
}
export default function VentaEntradasId() {
    const [cantidadEntradas, setCantidadEntradas] = useState(1);
    const fetchedData = useLoaderData<typeof loader>();
    const [data, setData] = useState<DataItem[]>([fetchedData]);
    const cantidadMaxima = data[0].data.eventos[0].entradas.filter((entrada: any) => entrada.estadoEntrada === "En venta").length

    const decrementarCantidad = () => {
        if (cantidadEntradas > 1) {
            setCantidadEntradas(cantidadEntradas - 1);
        }
    };

    const incrementarCantidad = () => {
        if (cantidadEntradas < cantidadMaxima) {
            setCantidadEntradas(cantidadEntradas + 1);
        }
    };
    console.log(data[0].data.eventos[0])
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden z-1 opacity-95 max-w-fit">
            <img src="https://random-image-pepebigotes.vercel.app/api/random-image" alt="Evento" className="w-screen h-[800px] object-cover" />

            <div className="p-4 sticky bottom-20 bg-white">
                <h2 className="font-bold text-xl mb-2">{data[0].data.eventos[0].nombre}</h2>
                <p className="text-gray-700 text-base">Descripción del evento. Aquí puedes agregar una descripción breve que explique de qué se trata el evento.</p>
                <div className="mt-4 flex items-stretch justify-end">
                    <div className="flex items-center pr-4">
                        <button onClick={decrementarCantidad} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-2">-</button>
                        <span className="px-4">{cantidadEntradas}</span>
                        <button onClick={incrementarCantidad} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg ml-2">+</button>
                    </div>
                </div>
                <Link to={`pasarelapago/${cantidadEntradas}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white mt-4 px-6 py-2 rounded-lg block w-full">
                        Comprar entrada
                    </button>
                </Link>

            </div>
        </div>
    )
}
