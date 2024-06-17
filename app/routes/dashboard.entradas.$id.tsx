import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import db from "~/services/db";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const entradaId = params.id;
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  if (!entradaId) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const entrada = await db.entrada.findMany({
    where: { eventoId: Number(entradaId) }, // Convert entradaId to string if needed
    include: {
      evento: {

      },
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
  const { entrada }: any = useLoaderData();
  console.log(entrada)
  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {entrada.map((evento: any) => (
          <div className="relative flex pb-12 flex-col items-center justify-center overflow-hidden bg-[#f2e8cf]">
            <div className="relative mx-auto">
              <div className="group relative flex cursor-pointer after:shadow-lg after:shadow-black">
                <div className="relative -left-16 top-0 z-10 w-96 rounded-xl bg-[#3d348b] px-5 py-3 text-base font-semibold leading-7 transition-all duration-700 group-hover:-left-14">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                    </div>
                    <div className="flex items-center gap-2">
                    </div>
                    <p>
                      <a
                        href="https://dashboard-tfc.vercel.app"
                        className="text-sky-500 opacity-0 hover:text-sky-600"
                      >
                        →
                      </a>
                    </p>
                  </div>
                </div>
                {/* main */}
                <div className="absolute -right-16 top-0 z-20 flex w-96 flex-col gap-4 self-end rounded-xl rounded-l-2xl border-none bg-[#7678ed] px-5 py-7 text-base font-semibold leading-7 transition-all duration-700 group-hover:-right-14 group-hover:w-64 group-hover:rounded-l-lg">
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <div className="font-bold text-[#fff]">Nombre: </div>
                      <p className="text-[#fff] flex-grow">{evento.evento.nombre}</p>
                    </div>
                    <p className="text-[#fff]">{evento.precio}€</p>
                    <p>
                      <a href="/home/ventaentradas" className="text-white/50">
                        Ir a venta entradas
                      </a>
                    </p>
                  </div>
                </div>
                <div className="h-16 bg-[#3d348b] w-[28rem] -left-10 shadow-2xl shadow-[#3d348b] absolute bottom-0" />
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}