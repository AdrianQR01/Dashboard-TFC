import { Outlet } from '@remix-run/react'
import { ModalAdd } from '~/components/modal_clients'
import { Tabla } from '~/components/tabla'


export default function Clientes() {
    return (
        <div>
            <Outlet/>
            <ModalAdd />
            <Tabla />
        </div>
    )
}