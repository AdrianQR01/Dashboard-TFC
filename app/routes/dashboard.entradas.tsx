import { Outlet } from '@remix-run/react'
import RadialChart from '~/components/radialchart'

export default function Entradas() {
    return (
        <div>
            <RadialChart/>
            <Outlet/>
            Estas en Entradas
        </div>
    )
}