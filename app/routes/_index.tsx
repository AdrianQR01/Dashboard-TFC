import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useMatches } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard TFC" },
    { name: "description", content: "Bienvenido al mejor dashboard para eventos de 2024!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  return redirect("/home");
}
export default function Index() {
  const matches = useMatches();
  const actual_url = matches
  return (
    // <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

    // </div>
    <>

    </>
  );
}
