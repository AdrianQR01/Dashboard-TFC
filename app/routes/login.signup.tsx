import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import argon2 from "argon2"; // Usar argon2 en lugar de bcrypt
import db from "../services/db";

export const meta: MetaFunction = () => {
    return [
        { title: 'Signup' },
        { name: 'description', content: 'This is the login page' }
    ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: '/dashboard'
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = form.get('name') as string;
    const surname = form.get('surname') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const hashedPassword = await argon2.hash(password);
    const user = {
        email: email,
        password: hashedPassword,
        name: name,
        surname: surname
    };
    await db.usuario.create({ data: user });
    return await authenticator.authenticate('form', request, {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        context: { formData: form }
    });
}

export default function SignUp() {
    return (
        <>
            <Form method="post" className="space-y-6 py-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nombre"
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder="Apellido"
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-blue-700 focus:invalid:outline-none"
                    />
                </div>
                <div className="flex flex-col items-end">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        required
                        autoComplete="current-password"
                        className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-blue-700 focus:invalid:outline-none"
                    />
                    <button type="reset" className="w-max p-3 -mr-3">
                        <span className="text-sm tracking-wide text-blue-600">Olvidaste tu contraseña?</span>
                    </button>
                </div>
                <div>
                    <button type="submit" className="w-full px-6 py-3 rounded-xl bg-sky-500 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                        <span className="font-semibold text-white text-lg">Registro</span>
                    </button>
                    <Link to="/login" className="w-max p-3 -ml-3">
                        <span className="text-sm tracking-wide text-blue-600">Ya tienes cuenta? Inicia sesión</span>
                    </Link>
                </div>
            </Form>

        </>
    )
}
