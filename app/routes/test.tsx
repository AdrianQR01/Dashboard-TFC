// routes/event.tsx
import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

let eventData: any[] = [];

export const loader = async () => {
    return json(eventData);
};

export let action: ActionFunction = async ({ request }) => {
    const data = await request.json();
    eventData.push(data);
    return json({ data });
};

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData) {
            navigate("/test");
        }
    }, [actionData]);

    console.log('Received event:', data);

    if (!data) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Datos recibidos</h1>
            <p>{data.map((test: any) => test.after.surname).join(', ')}</p>
        </div>
    );
}
