import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node'
import AreaChart from './components/charts/areachart'
import ColumnChart from './components/charts/columnchart'
import PieChart from './components/charts/piechart'
import CardTicket from './components/tickets/CardTicket'
import db from '~/services/db'
import { Outlet, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export const meta: MetaFunction = () => {
    return [
        { title: 'Eventos' },
        { name: 'description', content: 'This is the login page' }
    ]
}


export default function Eventos() {

    return (
        <Outlet/>
    )
}