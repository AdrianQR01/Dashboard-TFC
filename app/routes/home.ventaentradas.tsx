import Spline from '@splinetool/react-spline';
import { Outlet } from "@remix-run/react";

// const eventos = [
//     { id: 1, nombre: "Concierto de Rock", fecha: "2024-07-20", imagen: "https://picsum.photos/200/200" },
//     { id: 2, nombre: "Festival de Jazz", fecha: "2024-08-10", imagen: "https://picsum.photos/200/200" },
//     { id: 3, nombre: "Obra de Teatro", fecha: "2024-09-05", imagen: "https://picsum.photos/200/200" }
// ];


export default function VentaEntradas() {

    return (
        <>
        <div className="absolute w-full h-full opacity-35 bg-black z-0">
            <Spline
                scene="https://prod.spline.design/8YjP4eXvkjacqKNX/scene.splinecode"
            />
        </div>  
        <Outlet/>
        </>
    );
}
