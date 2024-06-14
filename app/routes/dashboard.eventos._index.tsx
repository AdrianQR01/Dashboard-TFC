import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node'
import AreaChart from './components/charts/areachart'
import ColumnChart from './components/charts/columnchart'
import PieChart from './components/charts/piechart'
import CardTicket from './components/tickets/CardTicket'
import db from '~/services/db'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export const meta: MetaFunction = () => {
    return [
        { title: 'Eventos' },
        { name: 'description', content: 'This is the login page' }
    ]
}

interface DataItem {
    [key: string]: any;
}
export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const data = await db.evento.findMany({
        where: {
            usuarioId: user.id,
        },
    });
    return json({ data });
}

export default function EventosIndex() {
    const { data: fetchedData } = useLoaderData<typeof loader>();
    return (
        <div className="flex flex-col h-full sm:h-screen w-auto p-8">
            {/* Top row */}
            <div className="flex flex-col justify-center rounded-2xl pb-10 pt-10">
                <div className="w-full h-fit ml-4 text-3xl">Eventos nuevos</div>
                <div className="flex flex-col md:flex-row gap-4 w-full h-fit overflow-auto">
                    {fetchedData.map((evento) => (
                        <CardTicket data={evento} />
                    ))}

                </div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col flex-wrap flex-1  ">
                <div className="w-full h-fit ml-4 text-3xl">
                    <h2>
                        Eventos antiguos
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full h-fit overflow-auto">
                {fetchedData.map((evento) => (
                        <CardTicket data={evento} />
                    ))}
                </div>
            </div>
        </div>
    )
}