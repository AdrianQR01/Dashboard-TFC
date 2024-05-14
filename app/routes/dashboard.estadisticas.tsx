import { Outlet } from '@remix-run/react'

export default function Estadisticas() {
    return (
        <div>
            <Outlet/>
            Estas en Estadisticas
        </div>
    )
}