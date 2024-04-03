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
      <div className="grid grid-cols-[auto,1fr] gap-[20px] h-screen p-8">
        <nav className="h-full border bg-white space-y-8 shadow-lg rounded-md"><NavBar/></nav>
        <div className="bg-gray-300 rounded-md overflow-y-auto"><PrincipalDashboard/></div>
      </div>
    </>
  )
}

