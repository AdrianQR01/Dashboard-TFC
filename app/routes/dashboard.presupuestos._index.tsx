import { LoaderFunctionArgs, json } from "@remix-run/node";
import TableResponsive from "./components/TableResponsive";
import { useLoaderData } from "@remix-run/react";
import TablaTest from "./components/TablaTest";
import TableResponsiveSeguimiento from "./components/TableResponsiveSeguimiento";
import db from "~/services/db";

export async function loader({ request }: LoaderFunctionArgs) {
  // const data = [
  //   { id: 1, name: 'John', age: 25, dash: '50'},
  //   { id: 2, name: 'Jane', age: 30, dash: '50'},
  //   { id: 3, name: 'Bob', age: 35, dash: '50'},
  // ];

  // return json(data);
  return await db.presupuesto.findMany({
    where: {},
  })
  // return data
}
export default function General() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-wrap">
      <div className="w-full h-full">
        <TablaTest data={data} />
      </div>
    </div>
  )
}