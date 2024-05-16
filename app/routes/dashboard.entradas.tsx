import { Outlet } from '@remix-run/react'
import ChartTickets from '~/components/chart_tickets'
import RadialChart from '~/components/radialchart'

export default function Entradas() {
    return (
        <div>
            <div >
                <ChartTickets/>
            </div>
            
            <Outlet/>
            Estas en Entradas
        </div>
    )
}