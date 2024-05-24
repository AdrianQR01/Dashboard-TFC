// app/routes/presupuestos.tsx
import Tabla from '~/components/tabla';
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import LineChart from '~/components/linechart';

export default function Presupuestos() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mt-4">EventCo Summit 2023</h1>
      <Tabs aria-label="Tabs with underline" style="underline">
      <Tabs.Item title="Gastos">
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
      <Tabs.Item title="Ingresos">
        This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
    </Tabs>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Revenue</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <div className="text-lg font-semibold">Revenue</div>
          <div className="text-2xl">$5,000</div>
          <div>Sep 20, 2023 - Sep 20, 2023</div>
          <LineChart />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Tabla />
      </div>
    </div>
  );
}
