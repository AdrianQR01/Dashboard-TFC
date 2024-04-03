import type { MetaFunction } from "@remix-run/node";
import NavBar from '../components/NavBar';
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="grid grid-cols-[0.5fr,1fr] gap-[20px] h-screen p-8">
        <nav className="bg-gray-400 h-full border bg-white space-y-8 shadow-lg rounded-md"><NavBar/></nav>
        <div className="bg-gray-300 rounded-md overflow-y-auto">Content Container</div>
      </div>
    </>
  );
}

