import { Checkbox } from 'flowbite-react';
import React from 'react';

type TableComponentProps = {
  data: Record<string, any>[];
};

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  const headers = Object.keys(data[0]);
  const rows = data.map(item => Object.values(item));

  return (
    <div className="flex justify-center h-fit">
      <div className="w-fit sm:w-full md:w-full">
        <div className="overflow-x-auto">
          <table className="w-full flex flex-col sm:inline-table sm:bg-white overflow-hidden">
            <thead>
              <tr className="sm:bg-[#222E3A]/[6%] flex flex-col sm:table-row mb-2 sm:rounded-none">
                <th className="py-3 px-0.5 hidden sm:table-cell text-center">
                  <Checkbox />
                </th>
                {headers.map((header, index) => {
                  const isFirst = index === 0;
                  const isLast = index === headers.length - 1;
                  const className = `
                    border-e border-l border-t 
                    ${isFirst ? 'rounded-tl-lg' : ''} 
                    ${isLast ? 'border-b rounded-bl-lg' : ''}
                  `;
                  return <th className={`${className.trim()} p-4 text-center`} key={header}>{header}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="sm:table-row flex flex-col sm:flex-row">
                  <td className="py-3 px-0.5 hidden sm:table-cell text-center">
                    <Checkbox />
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-4 border border-gray-200 text-center">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
