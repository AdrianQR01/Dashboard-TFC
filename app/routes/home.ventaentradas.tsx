import Spline from '@splinetool/react-spline';
import React from 'react';

const eventos = [
    { id: 1, nombre: "Concierto de Rock", fecha: "2024-07-20", imagen: "https://picsum.photos/200/200" },
    { id: 2, nombre: "Festival de Jazz", fecha: "2024-08-10", imagen: "https://picsum.photos/200/200" },
    { id: 3, nombre: "Obra de Teatro", fecha: "2024-09-05", imagen: "https://picsum.photos/200/200" }
];

export default function VentaEntradas() {
    return (
        <>
        <div className="absolute w-full h-full opacity-35 bg-black">
            <Spline
                scene="https://prod.spline.design/8YjP4eXvkjacqKNX/scene.splinecode"
            />
        </div>  
        <div className="relative container mx-auto p-4 mt-[69px]">
            <div className="grid grid-cols-1 gap-4">
                {eventos.map(evento => (
                    <div key={evento.id} className="bg-white bg-opacity-75 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center md:items-center">
                        <img src={evento.imagen} alt={evento.nombre} className="w-32 h-32 object-cover rounded-lg md:mr-6 mb-4 md:mb-0" />
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold mb-2">{evento.nombre}</h2>
                            <p className="text-gray-600">{evento.fecha}</p>
                        </div>
                        <button className="mt-4 md:mt-0 md:ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Comprar Entrada
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
