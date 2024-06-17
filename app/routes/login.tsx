import { Outlet, useMatches } from '@remix-run/react'

export default function Login() {
    const matches = useMatches();
    const actual_url = matches[2].id.split('.')[1]
    const isSignUpPage = actual_url.includes('signup');
    return (
        <div className="2xl:container h-screen m-auto bg-[#d1d1e9]">
            <div hidden className="fixed inset-0 w-7/12 lg:block">
                <img src="../fondo_login.jpg" className="w-full h-full object-cover" alt="background login" />
            </div>
            <div hidden className="fixed inset-0 w-6/12 ml-auto bg-[#d1d1e9] backdrop-blur-3xl lg:block"></div>
            <div className="relative h-full ml-auto lg:w-6/12 overflow-hidden bg-[#d1d1e9]">
                <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
                    <div className="space-y-6">
                        <a href="/">
                            <img
                                src="../logo_principal.jpg"
                                className="w-40"
                                alt="logoLogin"
                                style={{
                                    filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, .5))',
                                    maskImage: 'radial-gradient(circle at center, black 20%, transparent 99%)'
                                }}
                            />
                        </a>
                        <h1 className="font-medium text-lg text-[#2b2c34]">Bienvenido! {isSignUpPage ? 'Completa tu registro con este formulario' : 'Inicia con...'}</h1>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

