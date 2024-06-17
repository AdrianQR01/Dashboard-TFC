import { Outlet, json, useLoaderData, useMatches } from "@remix-run/react";
import Sidebar from "./components/Sidebar";
import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import db from "~/services/db";

export const meta: MetaFunction = () => {
  return [
    { title: 'Vista General' },
    { name: 'description', content: 'This is the login page' }
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  // const subscription = await db.usuario.subscribe()

  // for await (const event of subscription) {
  //   console.log('New event:', event)
  // }
  return { email: user.email, name: user.name, surname: user.surname, profilePic: user.profilePicture }
};

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, { redirectTo: "/login" })
}

export default function Dashboard() {
  const matches = useMatches();
  const actual_url = matches[2].id.split('.')[1]
  const isIndexPage = actual_url.includes('_index');
  const user = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-dvh bg-[#d1d1e9] flex flex-col-reverse items-center p-4 overflow-hidden sm:flex-row sm:h-screen">

      <div className="relative pr-3.5 z-auto top-2 sm:static sm:h-full">
        <Sidebar user={user} />
      </div>
      <div className="flex-1 w-full h-full overflow-x-auto rounded-3xl bg-[#fffffe] border relative">
        <h1 className="text-3xl text-[#2b2c34] font-bold pl-8 pt-5 font-test">{isIndexPage ? 'Vista General' : actual_url.charAt(0).toUpperCase() + actual_url.slice(1)}</h1>
        <Outlet />
      </div>
    </div>
  )
}