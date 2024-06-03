import React from 'react';
import { Card } from 'flowbite-react';

export function Cards() {
  return (
    <Card className="max-w-sm">
      <img
        className="object-cover w-full h-40 rounded-t-lg"
        src="https://picsum.photos/200/200"
        alt="Random"
      />
      <div className="">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </div>
    </Card>
  );
}