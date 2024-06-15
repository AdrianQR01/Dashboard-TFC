import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import AreaChart from "./components/charts/areachart"
import db from "~/services/db"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { SetStateAction, useState } from "react"
import TablaTest from "./components/TablaTest"

export const meta: MetaFunction = () => {
    return [
        { title: 'Pedidos' },
        { name: 'description', content: 'This is the login page' }
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    const ordenDeEntrada = await db.ordenDeEntrada.findMany({
        where: {},
    });
    return json(ordenDeEntrada);
}

interface DataItem {
    [key: string]: any;
}

export default function Pedidos() {
    const fetchedData = useLoaderData<typeof loader>();
    const submit = useSubmit();

    const [data, setData] = useState<DataItem[]>([fetchedData]);
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
                        <div className="w-full"><AreaChart data={data} setData={updateData}/></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex flex-wrap flex-1">
                <div className="w-full h-fit"><TablaTest data={data} setData={updateData} /></div>
            </div>
        </div>
    )
}