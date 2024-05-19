import { Outlet } from '@remix-run/react'
import ChartTickets from '~/components/chart_tickets'
import RadialChart from '~/components/radialchart'

export default function Entradas() {
    return (
        <div>
            <div className=' bg-slate-500'>
                <ChartTickets/>
            </div>
            
            <Outlet/>
            Estas en Entradas
        </div>
    )
}