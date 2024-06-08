import { useState } from 'react';
import { Checkbox } from 'flowbite-react';

export default function TablaTest({ data }: any) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map((item: any) => Object.values(item));

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Array(data.length).fill(false));

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(new Array(data.length).fill(newSelectAll));
  };

  const handleRowSelect = (index: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);

    if (newSelectedRows.every(Boolean)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full bg-white overflow-hidden">
          {/* Encabezado visible solo en PC */}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-100">
              <th className="py-3 px-0.5 text-center">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </th>
              {headers.map((header: any, index: any) => (
                <th
                  key={header}
                  className={`p-4 text-center border 
                  ${index === 0 ? 'rounded-tl-lg' : ''} 
                  ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
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
                <td className="p-4 border text-left sm:table-cell sm:text-center">
                  <Checkbox checked={selectedRows[rowIndex]} onChange={() => handleRowSelect(rowIndex)} />
                </td>
                {row.map((cell: any, cellIndex: any) => (
                  <td key={cellIndex} className="p-4 border text-left sm:table-cell">
                    <div className="flex sm:hidden">
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
