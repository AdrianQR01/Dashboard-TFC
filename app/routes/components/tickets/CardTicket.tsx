import { Link, useMatches } from "@remix-run/react";

interface Data {
    [key: string]: any;
}

export default function CardTicket({ data }: Data) {
    const matches = useMatches();
    const actual_url = matches[2].id.split('.')[1];

    console.log(data);

    return (
        <div className="flex justify-center p-1.5">
            <Link to={`${data.id}`} className="flex flex-col w-60 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                
                {actual_url.includes("eventos") ? (
                    <div>
                        <img className="object-cover w-full h-40 rounded-t-lg" src="https://picsum.photos/200/200" alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal w-full overflow-hidden">
                            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-pre-line">{data.nombre}</h1>
                            <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">{data.ubicacion}</p>
                            <p className="text-xs font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">{data.estadoEvento}</p>
                        </div>
                    </div>
                ) : actual_url.includes("servicios") ? (
                    <div>
                        <img className="object-cover w-full h-40 rounded-t-lg" src="https://picsum.photos/200/200" alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal w-full overflow-hidden">
                            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-pre-line">{data.nombre}</h1>
                            <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">{data.descripcion}</p>
                            <p className="text-xs font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">{data.tipoServicio}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img className="object-cover w-full h-40 rounded-t-lg" src="https://picsum.photos/200/200" alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal w-full overflow-hidden">
                            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-pre-line">{data.nombre}</h1>
                            <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">{data.descripcion}</p>
                            <p className="text-xs font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">{data.entradas.length} en total</p>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
}
