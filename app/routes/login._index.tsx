import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
    return [
        { title: 'Login' },
        { name: 'description', content: 'This is the login page' }
    ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/dashboard'
    })
}


export async function action({ request }: ActionFunctionArgs) {
    await authenticator.authenticate("form", request, {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })
}

export default function LoginIndex() {
    return (
        <>


            <Form method="post" className="space-y-6 py-6">
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                    />
                </div>

                <div className="flex flex-col items-start">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                    />
                    <button type="reset" className="w-max p-3 -mr-3">
                        <span className="text-sm tracking-wide text-blue-600">Olvidaste tu contraseña?</span>
                    </button>
                </div>

                <div>
                    <button type="submit" className="w-full px-6 py-3 rounded-xl bg-[#00ebc7] transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                        <span className="font-semibold text-[#00214d] text-lg">Inicia sesión</span>
                    </button>
                    <Link to="/login/signup" className="w-max p-3 -ml-3">
                        <span className="text-sm tracking-wide text-blue-600">No tienes cuenta? Registrate</span>
                    </Link>
                </div>
            </Form>

        </>
    )

}