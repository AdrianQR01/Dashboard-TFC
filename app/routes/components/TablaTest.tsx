import { Checkbox } from 'flowbite-react';

export default function TablaTest({ data }: any) {
  const headers = Object.keys(data[0]);
  const rows = data.map((item: any) => Object.values(item));

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="sm:inline-table w-full sm:bg-white overflow-hidden">
          {/* Encabezado visible solo en PC */}
          <thead className="text-black hidden sm:table-header-group">
            <tr className="sm:bg-[#222E3A]/[6%]">
              <th className="py-3 px-0.5 text-center">
                <Checkbox />
              </th>
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

          {/* Cuerpo de la tabla */}
          <tbody>
            {rows.map((row: any, rowIndex: any) => (
              <tr key={rowIndex} className="flex flex-col sm:table-row mb-2 sm:mb-0">
                {row.map((cell: any, cellIndex: any) => (
                  <td key={cellIndex} className="p-4 border text-left sm:table-cell">
                    <div className="flex sm:hidden">
                      {cellIndex === 0 && (
                        <div>
                          <Checkbox />
                        </div>
                      )}
                      <div className="font-bold w-1/2">{headers[cellIndex]}</div>
                      <div className="w-1/2">{cell}</div>
                    </div>
                    <div className="hidden sm:block">{cell}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
