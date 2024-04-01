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
      <div className="grid grid-cols-[320px,1fr] gap-[20px] h-screen p-8">
        <div className="bg-gray-400 rounded-md"><NavBar/></div>
        <div className="bg-gray-300 rounded-md overflow-y-auto">Content Container</div>
      </div>
    </>
  );
}

