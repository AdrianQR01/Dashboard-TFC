import { useState } from 'react';
import { Dropdown, Checkbox, Button } from "flowbite-react";
import { ModalEditForm } from "./ModalEditForm";
import { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';

interface dataItem {
  [key: string]: any;
}

interface TablaTestProps {
  data: dataItem[];
  setData: React.Dispatch<React.SetStateAction<dataItem[]>>;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  console.log(form.get("total"))
} 

export default function TablaTest({ data, setData }: TablaTestProps) {
  console.log(data)
  const dataGetted = data[0].data
  console.log(data[0].data)
  if (!dataGetted || dataGetted.length === 0) {
    return <div>No dataGetted available</div>;
  }
  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Array(dataGetted.length).fill(false));
  const [editProduct, setEditProduct] = useState<dataItem | null>(null);
  

  const headers = Object.keys(dataGetted[0]).filter(header => header != 'id');
  const rows = dataGetted.map((item: ArrayLike<unknown> | { [s: string]: unknown; }) => Object.values(item).filter((value, index) => headers.indexOf(Object.keys(item)[index]) !== -1));
  
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(new Array(dataGetted.length).fill(newSelectAll));
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
  const createEmptydataGettedItem = (): dataItem => {
    const emptyItem: dataItem = {};
    headers.forEach(header => {
      emptyItem[header] = "";
    });
    return emptyItem;
  };
  const handleNewClick = () => {
    setEditProduct(createEmptydataGettedItem());
  };

  const handleModalClose = () => {
    setEditProduct(null);
  };

  const handleProductSave = (updateddataGetted: dataItem) => {
    const newdataGetted = [...dataGetted, updateddataGetted];
    setData(newdataGetted);

    setEditProduct(null);
  };

  const handleProductDelete = (id: string | number) => {
    // Implement delete logic here
    setEditProduct(null);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-left m-4">
        <Dropdown label="Acciones" dismissOnClick={false}>
          <Dropdown.Item>Borrar todos</Dropdown.Item>
          <Dropdown.Item className="visible sm:hidden md:hidden">Marcar todos</Dropdown.Item>
        </Dropdown>
        <Button onClick={handleNewClick}>
          Añadir op
        </Button>
        {editProduct && (
          <Form method="post">
          <ModalEditForm
            data={editProduct}
            onClose={handleModalClose}
            onSave={handleProductSave}
            onDelete={handleProductDelete}
          />
          </Form>

        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white overflow-hidden">
          {/* Encabezado visible solo en PC */}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-100">
              <th className="py-3 px-0.5 text-center">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </th>
              {headers.map((header, index) => (
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
