import { Outlet } from '@remix-run/react'
import Navbar from '../components/navbar'
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { db } from "../services/index.js"
import { authenticator } from '~/services/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  return {email:user.email, name:user.name, surname:user.surname}
};

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, { redirectTo: "/login" })
}

export default function Dashboard() {
  const userData = useLoaderData<typeof loader>();
  console.log(userData)
  return (
    <div className="flex flex-col sm:flex-row-reverse h-screen overflow-hidden p-5">

      <div className='flex flex-grow sm:h-full h-96 bg-slate-200 relative right-0'>
        {/* h-5/6 */}
        <main className='max-h-screen overflow-y-auto'>
          <Outlet />

        </main>
      </div>
      <nav className="border bg-white sm:max-w-48 min-w-48 space-y-8 shadow-lg rounded-md container">
        <Navbar />
      </nav>
    </div>
  )
}
