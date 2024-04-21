import type { LinksFunction } from '@remix-run/node'
import stylesheet from './styles/tailwind.css?url'
import NavBar from './components/NavBar'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet }
]

export function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="grid grid-rows-[1fr,auto] gap-[20px] w-screen p-8 sm:grid-cols-[auto,1fr] h-screen">
          <header>
            <nav className="h-full border bg-white space-y-8 shadow-lg rounded-md row-span-3 order-last sm:order-first"><NavBar/></nav>
          </header>
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  return (
    <Outlet />
  )
}
