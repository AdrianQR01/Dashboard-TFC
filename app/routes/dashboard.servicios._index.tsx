import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import AreaChartFW from "./components/charts/areachartFW"
import { Cards } from "./components/services/CardServices"
import db from "~/services/db"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { useState } from 'react';
import { authenticator } from "~/services/auth.server"
import CardTicket from "./components/tickets/CardTicket"


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
    return json({data});
}
interface DataItem {
    [key: string]: any;
  }
export default function Servicios() {
    const fetchedData = useLoaderData<typeof loader>();

    const submit = useSubmit();

    const [data, setData] = useState<DataItem[]>([fetchedData]); // State to hold fetched data
  
    const updateData = (newData: DataItem) => {
      setData(Array.from(newData as DataItem[]));
      const formData = new FormData();
      // console.log(newData[newData.length - 1])
      for (const key in newData[newData.length - 1]) {
        // Update the last key and value in each iteration
        // console.log(newData[newData.length - 1][key])
        formData.append(key, newData[newData.length - 1][key]);
    }
       // Populate FormData with key and value from newData
      submit(formData, { method: "post" }); // Submit FormData
      // console.log(newData); // Log updated data
    };
    return (
        <div className="flex flex-col h-fit sm:h-screen w-auto p-4">
            {/* Top row */}
            <div className="flex justify-center bg-[#222E3A]/[4%] rounded-lg w-full">
                <div className="flex flex-col items-center sm:items-start sm:h-fit sm:flex-row mb-2 w-full">
                    <div className="w-full sm:w-full">
                        <div className="w-full"><AreaChartFW data={data} setData={updateData}/></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex w-full flex-row flex-wrap flex-1">
                <div className="flex flex-wrap p-4 flex-row justify-center w-fit h-fit">
                    
                    {data[0].data.servicios.map((servicio:any) => (
                        <CardTicket data={servicio}/>
                    ))}
                </div>
            </div>
        </div>
    )
}