import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import db from "~/services/db";

// export async function loader({ params }: LoaderFunctionArgs) {
//     const eventoId = params.idEvento;

//     const eventos = await db.evento.findMany({
//         where: {
//             id: Number(eventoId),
//         },
//         include: {
//             entradas: true
//         },
//         cacheStrategy: { ttl: 60 },
//     });
//     const data = { eventos }
//     return json({ data });
// }


export const action = async ({ request, params }: ActionFunctionArgs) => {
    // const cantidadEntradas = params.cantidad;
    // const eventoId = params.idEvento;
    // const entradasDisponibles = await db.evento.findUnique({
    //     where: {
    //         id: Number(eventoId),
    //     },
    //     include: {
    //         entradas: {
    //             where: {
    //                 estadoEntrada: 'En venta'
    //             }
    //         }

    //     },
    //     cacheStrategy: { ttl: 60 },
    // });
    // const totalEntradasDisponibles = entradasDisponibles?.entradas
    // console.log("Total: ", totalEntradasDisponibles)
    // Fetch available entries for the event
    const formData = await request.formData();
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const userData = await db.usuario.findUnique({
        where: { id: user.id },
    });
    const cantidadEntradas = Number(params.cantidad);
    const eventoId = Number(params.idEvento);
    const userId = Number(userData?.id) // Assuming userId is obtained from the form or session

    const availableEntradas = await db.entrada.findMany({
        where: {
            eventoId: eventoId,
            estadoEntrada: 'En venta',
        },
        take: cantidadEntradas,
    });

    if (availableEntradas.length < cantidadEntradas) {
        return json({ error: 'Not enough available entries' }, { status: 400 });
    }

    // Calculate total price
    const totalPrice = availableEntradas.reduce((total, entrada) => total + entrada.precio, 0);

    // Create a new OrdenDeEntrada
    const nuevaOrden = await db.ordenDeEntrada.create({
        data: {
            cantidad: cantidadEntradas,
            precio: totalPrice,
            clienteId: userId,
            eventoId: eventoId,
            usuarioId: userId,
        },
    });

    // Update the status of the entries to 'Vendido'
    await db.entrada.updateMany({
        where: {
            id: {
                in: availableEntradas.map((entrada) => entrada.id),
            },
        },
        data: {
            estadoEntrada: 'Vendido',
            ordenDeEntradaId: nuevaOrden.id,
        },
    });
    return redirect("/home/ventaentradas/completado");
};

export default function VentaEntradasPasarelaPago() {
    return (
        <div className="max-w-sm mx-auto pt-20 bg-white rounded-md shadow-md overflow-hidden z-10 opacity-95">
            <div className="px-6 py-4 bg-gray-900 text-white">
                <h1 className="text-lg font-bold">Pago con tarjeta</h1>
            </div>
            <div className="px-6 py-4">
                <Form method="post">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="card-number"
                        >
                            Numero de tarjeta
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="card-number"
                            type="text"
                            placeholder="**** **** **** ****"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="expiration-date"
                        >
                            Fecha de expiracion
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="expiration-date"
                            type="text"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                            CVV
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cvv"
                            type="text"
                            placeholder="***"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                            Titular de la tarjeta
                        </label>
                        <input
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Nombre completo"
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" type="submit">
                        Realiza tu compra ❤️
                    </button>
                </Form>
            </div>
        </div>

    )
}