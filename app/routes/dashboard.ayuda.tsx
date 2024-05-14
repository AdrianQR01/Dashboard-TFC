import { Outlet } from '@remix-run/react'

export default function Ayuda() {
    return (
        <div>
            <Outlet/>
            Estas en ayuda
        </div>
    )
}