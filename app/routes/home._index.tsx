import Spline from "@splinetool/react-spline";

export default function HomeIndex() {
    return (
        <div className="flex aspect-w-16 aspect-h-9 h-fit">
        <div className="absolute w-full h-screen opacity-35 bg-black">
            <Spline
                scene="https://prod.spline.design/8YjP4eXvkjacqKNX/scene.splinecode"
            />
        </div>

        <img src="/fondo_landingpage.jpg" alt="Primer Bloque Landing Page" className="w-full h-full object-cover" />
        <div className="absolute w-full h-full">
            <Spline scene="https://prod.spline.design/E6kJBt6E7GDBrPCf/scene.splinecode" />

        </div>
        <div className="absolute flex flex-row">

            <div className="relative w-[950px] mt-36 p-28 bg-gray-950 bg-opacity-50 rounded-r-3xl backdrop-blur-sm">
                <h1 className="text-[75px] font-semibold text-white">TicketFunny <br /> Tu mejor momento</h1>
                <span className="font-semibold text-white text-xl">Vive experiencias únicas, momentos inolvidables y un montón de historias diversas</span>
            </div>

        </div>

    </div>
    );
}