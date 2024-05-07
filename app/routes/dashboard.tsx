import { Outlet } from '@remix-run/react'
import Navbar from '../components/navbar'
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader(){
    return json({
        "name": "Alivika Tony",
        "avatar": "https://randomuser.me/api/portraits/women/79.jpg",
    });
};

export default function Dashboard() {
  const userData = useLoaderData<typeof loader>();
  console.log(userData)
  return (
    <div className="rounded-md overflow-y-auto row-spam">
        <div className="grid grid-rows-[1fr,auto] gap-x-[20px] p-8 sm:grid-cols-[auto,1fr] max-h-screen">
            <nav className="border bg-white space-y-8 shadow-lg rounded-md row-span-3 order-last sm:order-first">
              <Navbar/>
            </nav> 
            <main className='overflow-y-auto'>
              <Outlet/>
            </main>

        </div>
    </div>
  )
}
