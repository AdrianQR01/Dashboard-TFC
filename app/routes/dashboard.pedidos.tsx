import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import AreaChart from "./components/charts/areachart"
import db from "~/services/db"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { SetStateAction, useState } from "react"
import TablaTest from "./components/TablaTest"
import { authenticator } from "~/services/auth.server"

export const meta: MetaFunction = () => {
    return [
        { title: 'Pedidos' },
        { name: 'description', content: 'This is the login page' }
    ]
}
interface DataItem {
    [key: string]: any;
}
export async function loader({ request }: LoaderFunctionArgs) {
    const ordenDeEntrada = await db.ordenDeEntrada.findMany({
        where: {},
    });
    const data = { ordenDeEntrada }
    return json({data});
}


export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
    const ordenDeEntrada = await db.ordenDeEntrada.upsert({
      where: { id: Number(form.get("id")) },
      update: {
        cantidad: Number(form.get("cantidad")),
        clienteId: Number(form.get("clienteId")),
        eventoId: Number(form.get("eventoId")),
        precio: Number(form.get("precio")),
        usuarioId: user.id
      },
      create: {
        id: Number(form.get("id")),
        cantidad: Number(form.get("cantidad")),
        clienteId: Number(form.get("clienteId")),
        eventoId: Number(form.get("eventoId")),
        precio: Number(form.get("precio")),
        usuarioId: user.id
      }
    });
    console.log("getId: ", form.get("id"))
    
    return {result:true}
}

export default function Pedidos() {
    const fetchedData = useLoaderData<typeof loader>();

    const submit = useSubmit();

    const [data, setData] = useState<DataItem[]>([fetchedData]);
    const [dataChart, setDataChart] = useState<DataItem[]>([fetchedData]);
    console.log("DATA MUY IMPORTANTE", data)
    const updateData = (newData: DataItem) => {
        const prevData = data[0].data.ordenDeEntrada;
      
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
            ordenDeEntrada: newData
          }
        }]);
        setDataChart([{
          data: {
            ordenDeEntrada: newData
          }
        }])
      };

    return (
        <div className="flex flex-col h-fit sm:h-screen w-auto p-4">
            {/* Top row */}
            <div className="flex justify-center bg-[#222E3A]/[4%] rounded-lg w-full">
                <div className="flex flex-col items-center sm:items-start sm:h-fit sm:flex-row mb-2 w-full">
                    <div className="w-full sm:w-full">
                        <div className="w-full"><AreaChart data={dataChart} setData={updateData}/></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex flex-wrap flex-1">
                <div className="w-full h-fit"><TablaTest data={data[0].data.ordenDeEntrada} setData={updateData} /></div>
            </div>
        </div>
    )
}