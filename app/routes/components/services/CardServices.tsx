import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import { Link } from '@remix-run/react';

export function Cards() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if(count > 0 ) {
      setCount(count - 1)
    }
  };

  return (
    <Card className="w-40 h-40 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
      <Link to={"66684b499650fccdea15c9b9"}>
      <img
        className="object-cover w-10 h-10 rounded-t-lg"
        src="https://picsum.photos/200/200"
        alt="Random"
      />
      <div className="">
        <h1 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h1> 
      </div>
      {/* <div className="flex items-center">
        <button onClick={decrement} className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded">-</button>
        <span className="mx-2 text-lg font-semibold">{count}</span>
        <button onClick={increment} className="px-2 py-1 text-sm font-medium text-white bg-green-500 rounded">+</button>
      </div> */}
      </Link>
    </Card>
  );
}
