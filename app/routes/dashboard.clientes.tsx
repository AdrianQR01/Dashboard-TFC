import { Outlet } from '@remix-run/react'
import Tabla from '~/components/tabla'


export default function Clientes() {
    return (
        <div>
            <Outlet/>
            <Tabla />
        </div>
    )
}