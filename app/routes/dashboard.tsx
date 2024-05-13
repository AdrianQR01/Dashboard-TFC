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
    <div className="flex h-screen overflow-hidden p-5">
      <nav className="max-w-48 border bg-white space-y-8 shadow-lg rounded-md container">
        <Navbar />
      </nav>
      <div className='flex flex-grow'>
        <main className='relative right-0 max-h-screen bg-slate-300 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
