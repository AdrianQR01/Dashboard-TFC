import React, { useState, useEffect } from "react";
import { Form, Link, json, useLoaderData, useSubmit } from "@remix-run/react";
import TablaTest from "./components/TablaTest";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import db from "~/services/db";
import { Button, Datepicker } from "flowbite-react";

interface InputProps {
    label: string;
    name: string;
    type?: string;
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({ label, name, type = "text", id, value, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
    </div>
);

interface DataItem {
    [key: string]: any;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const total = url.searchParams.get("total");
    const nombrePresupuesto = url.searchParams.get("nombrePresupuesto");
    const fechaInicio = url.searchParams.get("fechaInicio")?.split("T")[0]; // Splitting to get date part

    const presupuesto = await db.presupuesto.findMany({
        where: {
            ...(id && { id: Number(id) }),
            ...(total && { total: Number(total) }),
            ...(nombrePresupuesto && { nombrePresupuesto }),
            ...(fechaInicio && {
                fechaInicio: {
                    gte: new Date(fechaInicio),
                    lte: new Date(new Date(fechaInicio).getTime() + 86400000),
                },
            }),
        },
    });

    return json({ presupuesto });
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const id = form.get("id");
    const total = form.get("total");
    const nombrePresupuesto: any = form.get("nombrePresupuesto");
    let fechaInicio;
    try {
        fechaInicio = parseSpanishDate(form.get("fechaInicio") as string);
    } catch (error) {
        fechaInicio = null;
    }
    const queryParams = new URLSearchParams();
    if (id) queryParams.append("id", id.toString());
    if (total) queryParams.append("total", total.toString());
    if (nombrePresupuesto) queryParams.append("nombrePresupuesto", nombrePresupuesto);
    if (fechaInicio) queryParams.append("fechaInicio", decodeURI(fechaInicio.toISOString()));

    return redirect(`?${queryParams.toString()}`);
};

function parseSpanishDate(dateString: string): Date {
    const monthMap: { [key: string]: number } = {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4,
        junio: 5, julio: 6, agosto: 7, septiembre: 8, octubre: 9,
        noviembre: 10, diciembre: 11,
    };
    const [dayStr, , monthStr, , yearStr] = dateString.split(" ");
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);
    const month = monthMap[monthStr.toLowerCase()];

    const parsedDate = new Date(year, month, day, 12, 0, 0);

    return parsedDate;
}

export default function Seguimiento() {
    const { presupuesto } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const [data, setData] = useState<DataItem[]>(presupuesto);
    const [id, setId] = useState<string>("");
    const [total, setTotal] = useState<string>("");
    const [nombrePresupuesto, setNombrePresupuesto] = useState<string>("");
    const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
    const [dataPicker, setDataPicker] = useState(false);

    useEffect(() => {
        setData(presupuesto);
    }, [presupuesto]);

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value);
    const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => setTotal(e.target.value);
    const handleNombrePresupuestoChange = (e: React.ChangeEvent<HTMLInputElement>) => setNombrePresupuesto(e.target.value);
    const handleFechaInicioChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        // Aquí obtienes la fecha del evento
        const dateString = event.target.value; // Suponiendo que el evento devuelve un string de fecha
    
        // Puedes convertir `dateString` a `Date` si es necesario
        const selectedDate = new Date(dateString);
    
        // Actualizas el estado de `fechaInicio`
        setFechaInicio(selectedDate);
    };

    const resetSearch = () => {
        setId("");
        setTotal("");
        setNombrePresupuesto("");
        setFechaInicio(null);
        setDataPicker(false);
    };

    return (
        <div className="flex flex-wrap flex-1">
            <div className="flex flex-col md:flex-row gap-4 w-full h-fit">
                <div className="relative w-full">
                    <div className="text-2xl p-4 w-full font-bold">Resumen del Presupuesto</div>
                    <Form className="p-4 w-fit" method="post">
                        <InputField label="Id" name="id" id="id" value={id} onChange={handleIdChange} />
                        <InputField label="Total" name="total" id="total" value={total} onChange={handleTotalChange} />
                        <InputField
                            label="Nombre del Presupuesto"
                            name="nombrePresupuesto"
                            id="nombrePresupuesto"
                            value={nombrePresupuesto}
                            onChange={handleNombrePresupuestoChange}
                        />

                        <div className="flex flex-row gap-2">
                            {!dataPicker ? (
                                <div className="mb-4">
                                    <Button onClick={() => setDataPicker(true)}>Buscar fecha de inicio</Button>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <Datepicker
                                        language="es-ES"
                                        labelTodayButton="Fecha actual"
                                        labelClearButton="Limpiar"
                                        name="fechaInicio"
                                        onChange={handleFechaInicioChange}
                                    />
                                </div>
                            )}
                            <Link to="#" onClick={resetSearch}>
                                <Button>Resetear búsqueda</Button>
                            </Link>
                        </div>
                        <div className="flex justify-start items-center">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Buscar
                            </button>
                        </div>
                    </Form>
                </div>
                <div className="relative w-full p-16">
                    <div className="bg-white rounded-md shadow-md">
                        <img
                            className="object-cover w-full h-40 rounded-t-lg"
                            src="https://picsum.photos/200/200"
                            alt="Presupuesto"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-wrap flex-1">
                <div className="w-full h-fit p-4">
                    <TablaTest data={data} setData={setData} />
                </div>
            </div>
        </div>
    );
}
