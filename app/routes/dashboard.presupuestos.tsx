// app/routes/presupuestos.tsx
import Tabla from '~/components/tabla';
import { Tabs } from 'flowbite-react';
import LineChart from '~/components/linechart';

export default function Presupuestos() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mt-4">EventCo Summit 2023</h1>
      <Tabs aria-label="Presupuesto Tabs" style="underline">
        <Tabs.Item title="Gastos">
          <div className="font-medium text-gray-800 dark:text-white">
            Contenido asociado a la pestaña de Gastos.
          </div>
        </Tabs.Item>
        <Tabs.Item title="Ingresos">
          <div className="font-medium text-gray-800 dark:text-white">
            Contenido asociado a la pestaña de Ingresos.
          </div>
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
