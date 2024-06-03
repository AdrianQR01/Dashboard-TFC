import TableResponsive from "./components/TableResponsive";
import AreaChart from "./components/charts/areachart";
import ColumnChart from "./components/charts/columnchart";
import PieChart from "./components/charts/piechart";
import { Link, MetaFunction, Outlet } from '@remix-run/react'
import { Button, ButtonGroup } from "flowbite-react";

export const meta: MetaFunction = () => {
    return [
        { title: 'Presupuestos' },
        { name: 'description', content: 'This is the login page' }
    ]
}

export default function Presupuestos() {
    return (
        <div className="flex flex-col h-fit sm:h-screen w-auto p-4">

            {/* Top row */}
            <div className="flex justify-center">
                <ButtonGroup>
                <Link to={'../presupuestos'}><Button color="gray">General</Button></Link>
                    <Button color="gray"><Link to={'seguimiento'}>Seguimiento</Link></Button>
                    <Button color="gray"><Link to={'antiguos'}>Antiguos</Link></Button>
                </ButtonGroup>
            </div>
            <Outlet />

            {/* <div className="flex justify-center bg-[#222E3A]/[4%] rounded-lg">
                <div className="flex flex-col items-center sm:items-start sm:h-fit sm:flex-row overflow-scroll mb-2">
                    <div className="w-auto sm:w-full">
                        <div className="m-2 w-[300px]"><PieChart /></div>
                    </div>
                    <div className="w-auto sm:w-full">
                        <div className="m-2 w-[320px]"><AreaChart /></div>
                    </div>
                    <div className="w-auto sm:w-full">
                        <div className="m-2 w-[300px]"><ColumnChart /></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full h-fit"><TableResponsive /></div>
            </div> */}

            {/* Bottom row */}

        </div>
    )
}