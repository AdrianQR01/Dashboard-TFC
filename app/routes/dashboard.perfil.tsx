import { Outlet } from '@remix-run/react'

export default function Perfil() {
    return (
        <div>
            <Outlet/>
            Estas en Perfil
        </div>
    )
}