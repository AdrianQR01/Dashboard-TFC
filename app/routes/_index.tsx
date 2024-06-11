import type { MetaFunction } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { act } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard TFC" },
    { name: "description", content: "Bienvenido al mejor dashboard para eventos de 2024!" },
  ];
};

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
