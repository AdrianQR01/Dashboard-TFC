import type { MetaFunction } from '@remix-run/node'
import AreaChart from '~/components/areachart'
import ColumnChart from '~/components/columnchart'
import LineChart from '~/components/linechart'
import PieChart from '~/components/piechart'
import DonutChart from '~/components/donutchart'
import RadialChart from '~/components/radialchart'
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'This is the content for dashboard index' }
  ]
}

export async function loader(){
    return json({
        "dato1": "tessst",
        "dato2": "https://randomuser.me/api/portraits/women/79.jpg",
    });
};

export default function DashboardIndex () {
  const tags = [
    <LineChart key='line'/>,
    <AreaChart key='area'/>,
    <ColumnChart key='column'/>,
    <PieChart key ='pie'/>,
    <DonutChart key='donut'/>,
    <RadialChart key='radial'/>
  ]
  const userData = useLoaderData<typeof loader>();
  console.log(userData)
  return (
    <div className="flex flex-wrap items-center justify-center">
        {tags.map((tag, index) => (
            <div key={index} className={'m-2 flex items-center justify-center'}>
                {tag}
            </div>
        ))}
    </div>
  )
}
