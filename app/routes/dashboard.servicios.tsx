import { MetaFunction } from "@remix-run/node"
import AreaChart from "./components/charts/areachartFW"
import { Cards } from "./components/services/CardServices"

export const meta: MetaFunction = () => {
    return [
        { title: 'Servicios' },
        { name: 'description', content: 'This is the login page' }
    ]
}

export default function Servicios() {
    return (
        <div className="flex flex-col h-fit sm:h-screen w-auto p-4">
            {/* Top row */}
            <div className="flex justify-center bg-[#222E3A]/[4%] rounded-lg w-full">
                <div className="flex flex-col items-center sm:items-start sm:h-fit sm:flex-row mb-2 w-full">
                    <div className="w-full sm:w-full">
                        <div className="w-full"><AreaChart /></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex w-full flex-row flex-wrap flex-1">
                <div className="flex flex-wrap p-4 flex-row justify-center w-fit h-fit">
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                    <Cards />
                </div>
            </div>
        </div>
    )
}