import { useState } from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import TablaTest from "./components/TablaTest";
import db from "~/services/db";
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
interface DataItem {
  [key: string]: any;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await db.presupuesto.findMany({
    where: {},
  });
  return json(data);
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  console.log(form.get("total"))
  return { result: true }
}

export default function General() {
  const fetchedData = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [data, setData] = useState<DataItem[]>(fetchedData); // State to hold fetched data

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
    <div className="flex flex-wrap">
      <div className="w-full h-full">
        {/* Pass fetched data to TablaTest component */}

        <TablaTest data={data} setData={updateData} />



      </div>
    </div>
  );
}