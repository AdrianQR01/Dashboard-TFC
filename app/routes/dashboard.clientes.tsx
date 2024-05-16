import { Outlet } from '@remix-run/react'
import { ModalGeneral } from '~/components/modal_clients'
import { Tabla } from '~/components/tabla'


export default function Clientes() {
    return (
        <div>
            <Outlet/>
            <Tabla />
        </div>
    )
}