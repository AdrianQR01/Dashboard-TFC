import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import AreaChart from "./components/charts/areachart"
import { Cards } from "./components/services/CardServices"
import db from "~/services/db"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { useState } from 'react';
import { authenticator } from "~/services/auth.server"
import CardTicket from "./components/tickets/CardTicket"
import TablaTest from "./components/TablaTest"
import RadialChart from "./components/charts/radialchart"
import AreaChartFW from "./components/charts/areachartFW"


export const meta: MetaFunction = () => {
    return [
        { title: 'Servicios' },
        { name: 'description', content: 'This is the login page' }
    ]
}
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
        cacheStrategy: { ttl: 60 },
    });
    const servicios = await db.servicio.findMany({
        where: {
            usuarioId: user.id,
        },
        cacheStrategy: { ttl: 60 },
    });
    const cliente = await db.cliente.findMany({
        where: {
            usuarioId: user.id,
        },
    })
    const data = { presupuesto, entrada, evento, cliente, servicios }
    return json({ data });
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    console.log(form.get("costo"), form.get("descripcion"), form.get("eventoId"), form.get("nombre"))
    const servicios = await db.servicio.upsert({
        where: { id: Number(form.get("id")) },
        update: {
            costo: Number(form.get("costo")),
            descripcion: String(form.get("descripcion")),
            eventoId: Number(form.get("eventoId")),
            nombre: String(form.get("nombre")),
            usuarioId: user.id
        },
        create: {
            id: Number(form.get("id")),
            costo: Number(form.get("costo")),
            descripcion: String(form.get("descripcion")),
            eventoId: Number(form.get("eventoId")),
            nombre: String(form.get("nombre")),
            usuarioId: user.id
        }
    });
    // console.log("getId: ", form.get("id"))

    return { result: true }
}

interface DataItem {
    [key: string]: any;
}
export default function Servicios() {
    const fetchedData = useLoaderData<typeof loader>();

    const submit = useSubmit();

    const [data, setData] = useState<DataItem[]>([fetchedData]); // State to hold fetched data
    const updateData = (newData: DataItem) => {
        const prevData = data[0].data.servicios;
        console.log(prevData)
        // Encontrar la fila alterada o creada
        const updatedRow = newData.find((newItem: { [x: string]: any; id?: any; }) => {
            const oldItem = prevData.find((prevItem: { id: any; }) => prevItem.id === newItem.id);

            // Si no existe el elemento anterior, es una fila creada
            if (!oldItem) return true;

            // Comparar cada campo para detectar cambios
            return Object.keys(newItem).some((key) => newItem[key] !== oldItem[key]);
        });

        console.log(updatedRow);

        if (updatedRow) {
            const formData = new FormData();
            for (const key in updatedRow) {
                formData.append(key, updatedRow[key]);
            }
            submit(formData, { method: "post" });
        }

        // Actualizar el estado con la nueva lista de datos
        setData([{
            data: {
                servicio: newData
            }
        }]);
    };
    return (
        <div className="flex flex-col h-fit sm:h-screen mt-8 w-auto p-4">
            {/* Bottom row */}
            <div className="flex flex-wrap flex-1">
                <div className="w-full h-fit"><TablaTest data={data[0].data.servicios} setData={updateData} /></div>
            </div>
        </div>

    )
}