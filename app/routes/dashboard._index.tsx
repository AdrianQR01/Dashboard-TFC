import AreaChart from "./components/charts/areachart";
import ColumnChart from "./components/charts/columnchart";
import DonutChart from "./components/charts/donutchart";
import LineChart from "./components/charts/linechart";
import PieChart from "./components/charts/piechart";
import RadialChart from "./components/charts/radialchart";
import AreaChartFW from "./components/charts/areachartFW";

export default function DashboardIndex() {
    const tags = [
        <LineChart key='line' />,
        <AreaChart key='area' />,
        <ColumnChart key='column' />,
        <PieChart key='pie' />,
        <RadialChart key='radial' />,
        <DonutChart key='donut' />
    ]
    return (
        <div className="flex justify-center flex-wrap items-stretch content-center p-8 w-fit">
            <AreaChartFW />
            {tags.map((tag, index) => (
                <div key={index} className={'m-2'}>
                    {tag}
                </div>
            ))}
        </div>
    )
}