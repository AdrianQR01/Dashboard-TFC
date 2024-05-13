import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='text-5xl inline-flex items-center'>
        <span>👨‍🔧⚠️</span>
        <h1 className="p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          Sitio en construcción...
        </h1>
        <span>⚠️👨‍🔧</span>
      </div>
      <div className="flex flex-row items-center mt-6">
        <Link to={{ pathname: "dashboard", search: "", hash: ""}}>
          <button type="button" className="w-36 h-12 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {/* Agrega el contenido del botón dentro del Link */}
            Ir a dashboard
          </button>
        </Link>
        <Link to={{ pathname: "login", search: "", hash: ""}}>
          <button type="button" className="w-36 h-12 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {/* Agrega el contenido del botón dentro del Link */}
            Ir al login
          </button>
        </Link>
      </div>
    </div>
  )
}
