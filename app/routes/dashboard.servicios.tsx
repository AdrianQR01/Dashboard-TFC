import { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"



export const meta: MetaFunction = () => {
    return [
        { title: 'Servicios' },
        { name: 'description', content: 'This is the login page' }
    ]
}

export default function Servicios() {

    return (
        <Outlet/>
    )
}