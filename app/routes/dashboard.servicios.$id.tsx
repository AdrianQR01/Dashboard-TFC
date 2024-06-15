import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/services/db";

export async function loader({ params }: LoaderFunctionArgs) {
  const servicioId = params.id;

  if (!servicioId) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const servicio = await db.servicio.findUnique({
    where: { id: Number(servicioId) }, // Convert entradaId to string if needed

  });

  if (!servicio) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { servicio };
}

export default function ServiciosID() {
    const { servicio }:any = useLoaderData();
    return (
        <div className="container mx-auto p-4 mt-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Detalles de el evento</h1>
          <p><strong>Nombre:</strong> {servicio.nombre}</p>
          <p><strong>Descripcion:</strong> {servicio.descripcion}</p>
          <p><strong>Coste:</strong> {servicio.costo}</p>
        </div>
      </div>
    )
}