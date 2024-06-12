import { Link } from "@remix-run/react";

export default function CardTicket() {
    return (
        <div className="flex justify-center p-1.5">
            <Link to={"66684b499650fccdea15c9b9"} className="flex flex-col w-60 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full h-40 rounded-t-lg" src="https://picsum.photos/200/200" alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal w-full overflow-hidden">
                    <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-pre-line">La velada del año 10</h1>
                    <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">1600 Pennsylvania Avenue NW, Washington, DC 20500, EE. UU.</p>
                    <p className="text-xs font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-pre-wrap">1 de 10000 actuales</p>
                </div>
            </Link>
        </div>
    )
}