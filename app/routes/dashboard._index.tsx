import type { MetaFunction } from '@remix-run/node'
import AreaChart from '~/components/areachart'
import ColumnChart from '~/components/columnchart'
import LineChart from '~/components/linechart'

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'This is the content for dashboard index' }
  ]
}
export default function DashboardIndex () {
  const tags = [
    <LineChart key='line'/>,
    <AreaChart key='area'/>,
    <ColumnChart key='column'/>
  ]
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
