import { Outlet } from '@remix-run/react'

export default function Presupuestos() {
    return (
        <div>
            <Outlet />
            Estas en Presupuestos
        </div>
    )
}