import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/services/db";

export async function loader({ params }: LoaderFunctionArgs) {
  const eventoId = params.id;

  if (!eventoId) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const evento = await db.evento.findUnique({
    where: { id: Number(eventoId) }, // Convert entradaId to string if needed

  });

  if (!evento) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { evento };
}

export default function EntradaID() {
    const { evento }:any = useLoaderData();
    return (
        <div className="container mx-auto p-4 mt-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Detalles de el evento</h1>
          <p><strong>Nombre:</strong> {evento.nombre}</p>
          <p><strong>Fecha:</strong> ${evento.fecha}</p>
          <p><strong>Ubicacion:</strong> {evento.ubicacion}</p>
          <p><strong>Descripcion:</strong> {evento.descripcion}</p>
          <p><strong>Estado evento:</strong> {evento.estadoEvento}</p>
        </div>
      </div>
    )
}