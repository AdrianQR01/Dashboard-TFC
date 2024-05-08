import { Outlet } from '@remix-run/react'
import Navbar from '../components/navbar'
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { db } from "../services/index.js"


export async function loader(){
  const test_client = await db.cliente.findMany()
  return json(test_client);
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
