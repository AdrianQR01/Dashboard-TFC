import { Form } from "@remix-run/react";
import TableResponsiveSeguimiento from "./components/TableResponsiveSeguimiento";

interface InputProps {
    label: string;
    name: string;
    type?: string;
    id: string;
}

const InputField: React.FC<InputProps> = ({ label, name, type = "text", id }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={id}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
    </div>
);

export default function Seguimiento() {
    return (
        <div className="flex flex-wrap flex-1">
            <div className="flex flex-col md:flex-row gap-4 w-full h-fit">
                <div className="relative w-full">
                    <div className="text-2xl p-4 w-full font-bold">Resumen del Presupuesto</div>
                    <Form className="p-4 w-fit" method="post">
                        <InputField label="Item" name="item" id="item" />
                        <InputField label="Budgeted Amount" name="amount" id="amount" />
                        <InputField label="Description" name="description" id="description" />
                        <InputField label="Allocation" name="allocation" id="allocation" />
                        <div className="flex justify-start items-center">
                            <button
                                type="submit"
                                className="inline-flex items-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Buscar
                            </button>
                        </div>
                    </Form>
                </div>
                <div className="relative w-full p-16">
                    <div className="bg-white rounded-md shadow-md">
                        <img className="object-cover w-full h-40 rounded-t-lg" src="https://picsum.photos/200/200" alt="Presupuesto" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-wrap flex-1  ">
                <div className="w-full h-fit p-4"><TableResponsiveSeguimiento /></div>
            </div>
        </div>
    );
}
