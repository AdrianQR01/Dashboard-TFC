import { LoaderFunctionArgs, json } from "@remix-run/node";
import TableResponsive from "./components/TableResponsive";
import { useLoaderData } from "@remix-run/react";
import TablaTest from "./components/TablaTest";

export async function loader({ request }: LoaderFunctionArgs) {
  const data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
  ];

  return json(data);
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