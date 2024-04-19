import type { MetaFunction } from "@remix-run/node";
import NavBar from '../components/NavBar';
import PrincipalDashboard from '../components/PrincipalDashboard';
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="grid grid-rows-[1fr,auto] gap-[20px] w-screen p-8 sm:grid-cols-[auto,1fr] h-screen">
        <nav className="h-full border bg-white space-y-8 shadow-lg rounded-md row-span-3"><NavBar/></nav>
        <div className="rounded-md overflow-y-auto row-spam"><PrincipalDashboard/></div>
      </div>
    </>
  )
}

