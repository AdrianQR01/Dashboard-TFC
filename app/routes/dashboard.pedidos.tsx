import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node"
import AreaChart from "./components/charts/areachart"
import TableResponsive from "./components/TableResponsive"
import db from "~/services/db"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { SetStateAction, useState } from "react"

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
    const data = await db.cliente.findMany({
        where: {},
    });
    return json(data);
}


export default function Pedidos() {
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
                        <div className="w-full"><AreaChart data={data} setData={updateData} /></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex flex-wrap flex-1">
                <div className="w-full h-fit"><TableResponsive /></div>
            </div>
        </div>
    )
}