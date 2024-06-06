import { Checkbox } from 'flowbite-react';

export default function TablaTest({ data }: any) {
  const headers = Object.keys(data[0]);
  const rows = data.map((item: any) => Object.values(item));

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="sm:inline-table w-full flex flex-row sm:bg-white overflow-hidden">
          <thead className="text-black">
            <tr className="flex flex-col sm:bg-[#222E3A]/[6%] sm:table-row mb-2 sm:rounded-none">
              <th className="py-3 px-0.5 text-center">
                <Checkbox />
              </th>
              {rows.map((rows: any) => (
                headers.map((header: any, index: any) => (
                  <th
                    key={header}
                    className={`p-4 text-center border
                  ${index === 0 ? 'rounded-tl-lg' : ''} 
                  ${index === headers.length - 1 ? 'border-b rounded-bl-lg' : ''}`}
                  >
                    {header}
                  </th>
                ))
              ))}
              {headers.map((header: any, index: any) => (
                <th
                  key={header}
                  className={`p-4 text-center border 
                  ${index === 0 ? 'rounded-tl-lg' : ''} 
                  ${index === headers.length - 1 ? 'border-b rounded-bl-lg' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
    // <div className="flex justify-center h-fit">
    //   <div className="w-fit sm:w-full md:w-full">
    //     <div className="overflow-x-auto">
    //       <table className="w-full sm:inline-table sm:bg-white overflow-hidden">
    //         {/* Thead for desktop */}
    //         <thead className="hidden sm:table-header-group">
    // <tr className="sm:bg-[#222E3A]/[6%] sm:table-row mb-2 sm:rounded-none">
    //   <th className="py-3 px-0.5 text-center">
    //     <Checkbox />
    //   </th>
    //   {headers.map((header, index) => (
    //     <th
    //       key={header}
    //       className={`p-4 text-center border 
    //       ${index === 0 ? 'rounded-tl-lg' : ''} 
    //       ${index === headers.length - 1 ? 'border-b rounded-bl-lg' : ''}`}
    //     >
    //       {header}
    //     </th>
    //   ))}
    // </tr>
    //         </thead>
    //         <tbody className="flex flex-col sm:table-row-group">
    //           {rows.map((row: any, rowIndex: any) => (
    //             <tr key={rowIndex} className="flex flex-col sm:table-row">
    //               {/* Thead for mobile */}

    //               <thead className="sm:hidden grid">
    //                 <tr className="flex flex-col mb-2">
    //                   <th className="py-3 px-0.5 text-center">
    //                     <Checkbox />
    //                   </th>
    //                   {headers.map((header, index) => (
    //                     <th
    //                       key={header}
    //                       className={`p-4 text-center border 
    //                       ${index === 0 ? 'rounded-tl-lg' : ''} 
    //                       ${index === headers.length - 1 ? 'border-b rounded-bl-lg' : ''}`}
    //                     >
    //                       {header}

    //                     </th>
    //                   ))}
    //                   {row.map((cell: string, cellIndex: any) => (

    //                     <td key={cellIndex} className="p-4 border border-gray-200 text-center">{cell}</td>
    //                   ))}
    //                 </tr>
    //               </thead>
    //               <td className="py-3 px-0.5 hidden sm:table-cell text-center">
    //                 <Checkbox />
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};
