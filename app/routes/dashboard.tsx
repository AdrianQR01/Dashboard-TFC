import { Outlet } from '@remix-run/react'
import Navbar from '../components/navbar'
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { db } from "../services/index.js"


export async function loader() {
  const test_client = await db.cliente.findMany()
  return test_client;
};

export default function Dashboard() {
  const userData = useLoaderData<typeof loader>();
  console.log(userData)
  return (
    <div className="flex flex-col sm:flex-row-reverse h-screen overflow-hidden p-5">

      <div className='flex flex-grow h-5/6 sm:h-full'>
        <main className='relative right-0 max-h-screen overflow-y-auto overflow-hidden'>
          <Outlet />
        </main>
      </div>
      <nav className="border bg-white sm:max-w-48 min-w-48 space-y-8 shadow-lg rounded-md container">
        <Navbar />
      </nav>
    </div>
  )
}
