import { Checkbox } from 'flowbite-react';
import React from 'react';

const TableComponent = ({ data }: any) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((item: string) => Object.values(item));

  return (
    // <table>
    //   <thead>
    //     <tr>
    //       {headers.map(header => <th key={header}>{header}</th>)}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {rows.map((row: any[], index: React.Key | null | undefined) => (
    //       <tr key={index}>
    //         {row.map((cell, index) => <td key={index}>{cell}</td>)}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <div className="flex justify-center h-fit">
      <div className="w-fit sm:w-full md:w-full">
        <div className='overflow-x-auto'>
          <table className="w-full flex flex-col sm:inline-table sm:bg-white overflow-hidden">
            <thead>
              <tr className="sm:bg-[#222E3A]/[6%] flex flex-col sm:table-row mb-2 sm:rounded-none">
                <th className="py-3 px-0.5 hidden sm:table-cell">
                  <Checkbox
                  // checked={selectAll}
                  // onChange={handleSelectAll}
                  />
                </th>
                {headers.map((header, index) => {
                  const isFirst = index === 0;
                  const isLast = index === headers.length - 1;
                  const className = `
                border-e border-l border-t 
                ${isFirst ? 'rounded-tl' : ''} 
                ${isLast ? 'border-b rounded-bl' : ''}`;
                  return <th className={className.trim()} key={header}>{header}</th>;
                })}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>


  );
};

export default TableComponent;
