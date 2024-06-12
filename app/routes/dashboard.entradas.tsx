import { MetaFunction } from '@remix-run/node'
import AreaChart from './components/charts/areachart'
import ColumnChart from './components/charts/columnchart'
import PieChart from './components/charts/piechart'
import CardTicket from './components/tickets/CardTicket'
import { Outlet } from '@remix-run/react'

export const meta: MetaFunction = () => {
    return [
        { title: 'Entradas' },
        { name: 'description', content: 'This is the login page' }
    ]
}
export default function Entradas() {
    return (
        <Outlet/>
    )
}