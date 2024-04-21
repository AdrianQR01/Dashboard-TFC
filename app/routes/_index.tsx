import type { MetaFunction } from '@remix-run/node'

import PrincipalDashboard from '../components/PrincipalDashboard'
export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export default function Index () {
  return (
    <>
      <div className="rounded-md overflow-y-auto row-spam"><PrincipalDashboard/></div>
    </>
  )
}
