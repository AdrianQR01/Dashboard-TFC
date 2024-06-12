import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/services/db";

export async function loader({ params }: LoaderFunctionArgs) {
  const entradaId = params.id;

  if (!entradaId) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const entrada = await db.entrada.findUnique({
    where: { id: entradaId },
    include: {
      ordenDeEntrada: true,
      evento: true,
      usuario: true,
    },
  });

  if (!entrada) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { entrada };
}

export default function EntradaID() {
    const { entrada }:any = useLoaderData();
    return (
        <div className="container mx-auto p-4 mt-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Detalle de la Entrada</h1>
          <p><strong>Número:</strong> {entrada.numero}</p>
          <p><strong>Precio:</strong> ${entrada.precio.toFixed(2)}</p>
          <p><strong>Evento:</strong> {entrada.evento.nombre}</p>
          <p><strong>Orden de Entrada ID:</strong> {entrada.ordenDeEntradaId}</p>
          <p><strong>Usuario:</strong> {entrada.usuario.nombre}</p>
        </div>
      </div>
    )
}