import { Outlet } from '@remix-run/react'

export default function Pedidos() {
    return (
        <div>
            <Outlet/>
            Estas en Pedidos
        </div>
    )
}