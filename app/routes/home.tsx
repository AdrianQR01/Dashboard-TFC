import { Link, Outlet, useMatches } from "@remix-run/react";
import Spline from "@splinetool/react-spline";
import { Button, Navbar, Footer } from "flowbite-react";
export default function Home() {
    const matches = useMatches();
    const actual_url = matches[2].id.split('.')[1]
    console.log(actual_url)
    return (
        <>

            <div className="">
                <div className="fixed top-0 z-50 w-full">
                    <Navbar fluid className="bg-black">
                        <Navbar.Brand href="https://flowbite-react.com">
                            {/* <img src="/logo_principal.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                            <img src="/logo_principal.jpg" alt="Logo de DashboardTFC" width={140} className="mx-auto mr-3 sm:h-12"
                                style={{
                                    filter: 'drop-shadow(0 0 5px rgba(0, 0, 0, .5))',
                                    maskImage: 'radial-gradient(circle at center, black 20%, transparent 99%)'
                                }}
                            />
                        </Navbar.Brand>
                        <div className="flex md:order-2 gap-2">
                            <Link to={"/dashboard"}>
                            <Button>Comienza tu aventura</Button>
                            </Link>
                            
                            <Navbar.Toggle />
                        </div>
                        <Navbar.Collapse>
                            <Link to={"/home"}>
                                <Navbar.Link active={actual_url === '_index'} className="text-white">
                                    Inicio
                                </Navbar.Link>
                            </Link>
                            <Link to={"/home/ventaentradas"}>
                                <Navbar.Link active={actual_url === 'ventaentradas'} className="text-white">Entradas</Navbar.Link>
                            </Link>
                            <Link to={"/home/contacto"}>
                                <Navbar.Link active={actual_url === 'contacto'} className="text-white">Contacto</Navbar.Link>

                            </Link>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <Outlet />
                <div className="fixed bottom-0 z-50 w-full">
                    <Footer container>
                        <Footer.Copyright href="#" by="AQR & GFT™" year={2024} />
                        <Footer.Title title="* Trabajo academico *" className="mb-0" />
                    </Footer>
                </div>

            </div>

        </>
    );
}