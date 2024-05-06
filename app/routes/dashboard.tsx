import { Outlet } from '@remix-run/react'
import Navbar from '../components/navbar'

export default function Dashboard () {
  return (
    <div className="rounded-md overflow-y-auto row-spam">
        <div className="grid grid-rows-[1fr,auto] gap-[20px] w-screen p-8 sm:grid-cols-[auto,1fr] h-screen">
            <nav className="h-full border bg-white space-y-8 shadow-lg rounded-md row-span-3 order-last sm:order-first">
                <Navbar/>
            </nav>
            <Outlet/>
        </div>
    </div>
  )
}
