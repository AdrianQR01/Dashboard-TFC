import AreaChart from "./components/charts/areachart";
import ColumnChart from "./components/charts/columnchart";
import PieChart from "./components/charts/piechart";
import CardTicket from "./components/tickets/CardTicket";

export default function EntradasIndex() {
    return (
        <div className="flex flex-col h-fit sm:h-screen w-auto p-4">
            {/* Top row */}
            <div className="flex justify-center bg-[#222E3A]/[2%] rounded-2xl">
                <div className="flex flex-col items-center sm:items-start sm:h-fit sm:flex-row overflow-hidden sm:overflow-auto mb-2">
                    <div className="w-auto sm:w-full">
                        <div className="m-2 w-[300px]"><PieChart /></div>
                    </div>
                    <div className="w-auto sm:w-full">
                        <div className="m-2 w-[320px]"><AreaChart /></div>
                    </div>
                    <div className="w-auto sm:w-full">
                        <div className="m-2 w-[300px]"><ColumnChart /></div>
                    </div>
                </div>
            </div>


            {/* Bottom row */}
            <div className="flex flex-wrap flex-1">
                <div className="flex flex-col md:flex-row gap-4 w-full h-fit overflow-auto">
                    <CardTicket/>
                    <CardTicket/>
                    <CardTicket/>
                    <CardTicket/>
                    <CardTicket/>
                    <CardTicket/>
                    <CardTicket/>
                    <CardTicket/>
                </div>
            </div>
        </div>
    )
}