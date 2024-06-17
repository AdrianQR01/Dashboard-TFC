import { useState } from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import TablaTest from "./components/TablaTest";
import db from "~/services/db";
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
interface DataItem {
  [key: string]: any;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const presupuesto = await db.presupuesto.findMany({
    where: {},
  });
  const data = { presupuesto }
  return json({ data });
}


export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const presupuesto = await db.presupuesto.upsert({
    where: { id: Number(form.get("id")) },
    update: {
      total: Number(form.get("total")),
      nombrePresupuesto: String(form.get("nombrePresupuesto")),
      estado: String(form.get("estado")),
      fechaInicio: String(form.get("fechaInicio")),
      fechaFin: String(form.get("fechaFin")),
      eventoId: Number(form.get("eventoId")),
      usuarioId: user.id
    },
    create: {
      id: Number(form.get("id")),
      total: Number(form.get("total")),
      nombrePresupuesto: String(form.get("nombrePresupuesto")),
      estado: String(form.get("estado")),
      fechaInicio: String(form.get("fechaInicio")),
      fechaFin: String(form.get("fechaFin")),
      eventoId: Number(form.get("eventoId")),
      usuarioId: user.id
    }
  });
  
  // console.log(Number(form.get("id")), Number(form.get("total")),String(form.get("nombrePresupuesto")),String(form.get("estado")),String(form.get("fechaInicio")),String(form.get("fechaFin")),Number(form.get("eventoId")),Number(form.get("usuarioId")))
  // return { presupuesto }
  return {result:true}
}

export default function General() {
  const fetchedData = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [data, setData] = useState<DataItem[]>([fetchedData]); // State to hold fetched data

  const updateData = (newData: DataItem) => {
    const prevData = data[0].data.presupuesto;
  
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
        presupuesto: newData
      }
    }]);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full h-full">
        {/* Pass fetched data to TablaTest component */}

        <TablaTest data={data[0].data.presupuesto} setData={updateData} />



      </div>
    </div>
  );
}