import { Outlet } from '@remix-run/react'
import { DropMenu } from '~/components/dropmenu_clients'
import { Tabla } from '~/components/tabla'


export default function Clientes() {
    return (
        <div>
            <Outlet/>
            <DropMenu/>
            <Tabla />
        </div>
    )
}