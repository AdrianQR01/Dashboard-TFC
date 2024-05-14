import { Outlet } from '@remix-run/react'

export default function Entradas() {
    return (
        <div>
            <Outlet/>
            Estas en Entradas
        </div>
    )
}