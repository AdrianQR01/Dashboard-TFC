import { useState } from 'react';
import { Dropdown, Checkbox, Button, Datepicker, Badge } from "flowbite-react";
import { ModalEditForm } from "./ModalEditForm";
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';

interface dataItem {
  [key: string]: any;
}

interface TablaTestProps {
  data: dataItem[];
  setData: React.Dispatch<React.SetStateAction<dataItem[]>>;
}

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const form = await request.formData();
//   console.log(form.get("total"))
// }
function calculateAge(birthDate: Date): number {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let age = today.getFullYear() - birthYear;
  if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
    age--;
  }

  return age;
}
export default function TablaTest({ data, setData }: TablaTestProps) {
  // console.log("Data lleganding tabla: ", data)
  if (!data || data.length === 0) {
    return <div>No dataGetted available</div>;
  }

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Array(data.length).fill(false));
  const [editProduct, setEditProduct] = useState<dataItem | null>(null);
  console.log("editProduct: ", editProduct)


  const headers = Object.keys(data[0]).filter(header => header && !header.toLowerCase().includes('usuario') && !header.toLowerCase().includes('password'));

  const rows = data.map(item => {
    return Object.keys(item).filter(key => key && !key.toLowerCase().includes('usuario') && !key.toLowerCase().includes('password')).map(key => item[key]);
  });

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
  const createEmptydataGettedItem = (): dataItem => {
    const emptyItem: dataItem = {};
    emptyItem["id"] = rows[rows.length - 1][0] + 1
    headers.forEach(header => {
      if (header !== 'id') {
        emptyItem[header] = "";
      }

    });
    console.log(emptyItem)
    return emptyItem;
  };
  const handleNewClick = () => {
    setEditProduct(createEmptydataGettedItem());
  };

  const handleModalClose = () => {
    setEditProduct(null);
  };
  const handleEditClick = (item: dataItem) => {
    // Filtrar solo las claves relevantes para editProduct
    const filteredItem: dataItem = {};
    console.log("filtrados: ", filteredItem)
    headers.forEach((header, index) => {
      filteredItem[header] = item[index];
      console.log("filtrados2: ", filteredItem[header])
    });
    setEditProduct(filteredItem);
  };
  const handleProductSave = (updatedData: dataItem) => {
    const index = data.findIndex(item => item.id === updatedData.id);
    if (index !== -1) {
      // Update existing data
      const newData = [...data];
      newData[index] = updatedData;
      setData(newData);
    } else {
      // Add new data
      setData([...data, updatedData]);
    }
    setEditProduct(null);
  };

  const handleProductDelete = (id: string | number) => {
  const newData = data.filter(item => item.id !== id);
  setData(newData);
  setEditProduct(null); // Cerrar el modal de edición si está abierto
};

  return (
    <div className="w-full">
      <div className="flex items-center justify-left mb-4 gap-2">
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
        <table className="w-full bg-white min-w-[500px]">
          {/* Encabezado visible solo en PC */}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-100">
              <th className="py-3 px-0.5 text-center">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </th>
              {headers.map((header, index) => {
                if (header?.toLowerCase() === "id") return null;
                return (
                  <th
                    key={header}
                    className={`p-4 text-center border 
                  ${index === 0 ? 'rounded-tl-lg' : ''} 
                  ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    {header.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace(/\bid\b/gi, '').trim()}
                  </th>
                )

              })}
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody>
            {rows.map((row: any, rowIndex: any) => (
              <tr key={rowIndex} className="flex flex-col sm:table-row mb-2 sm:mb-0">
                <td className="p-4 border text-left sm:table-cell sm:text-center">
                  <Checkbox checked={selectedRows[rowIndex]} onChange={() => handleRowSelect(rowIndex)} />
                </td>
                {row.map((cell: any, cellIndex: any) => {
                  if (headers[cellIndex].toLowerCase() === "id") return null;
                  const showButton = headers[cellIndex].includes('Id');
                  const dateView = headers[cellIndex].includes('fecha') && !headers[cellIndex].includes('fechaNacimiento');
                  const birthdayView = headers[cellIndex].includes('fechaNacimiento');
                  const statusView = headers[cellIndex].includes('estado');
                  const totalView = headers[cellIndex].includes('total');
                  return (
                    <td key={cellIndex} className="p-4 border text-left sm:table-cell">
                      <div className="flex sm:hidden">
                        <div className="font-bold w-1/2">{headers[cellIndex].replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace(/\bid\b/gi, '').trim()}</div>

                        {showButton ? (
                          <div className='flex items-center justify-center'>
                            <Link to={`../${headers[cellIndex].replace('Id', '')}s/${cell}`}>
                              <Button className="bg-blue-500 text-white rounded">
                                {headers[cellIndex].replace('Id', '').replace(/^./, (str) => str.toUpperCase())}
                              </Button>
                            </Link>
                          </div>
                        ) : dateView ? (
                          <div className='min-w-52'>
                            <Datepicker
                              language="es-ES"
                              labelTodayButton="Fecha actual"
                              className="pointer-events-none"
                              minDate={new Date(cell)}
                              maxDate={new Date(cell)}
                            />
                          </div>
                        ) : statusView ? (
                          <div>
                            {cell === "Cancelado" && (
                              <Badge color="failure">Cancelado</Badge>
                            )}
                            {cell === "En progreso" && (
                              <Badge color="warning">En progreso</Badge>
                            )}
                            {cell === "Finalizado" && (
                              <Badge color="success">Finalizado</Badge>
                            )}
                          </div>
                        ) : totalView ? (
                          <div className="w-1/2">{cell} €</div>
                        ) : birthdayView ? (
                          <div className="flex flex-col items-start gap-2">
                            <div className='text-center'>{calculateAge(new Date(cell))} años</div>
                            <Datepicker
                              language="es-ES"
                              labelTodayButton="Fecha actual"
                              className="pointer-events-none"
                              minDate={new Date(cell)}
                              maxDate={new Date(cell)}
                            />
                          </div>
                        ) : (
                          <div className="w-1/2">{cell}</div>
                        )}

                      </div>
                      <div className="hidden sm:block">
                        {showButton ? (
                          <div className='flex items-center justify-center'>
                            <Link to={`../${headers[cellIndex].replace('Id', '')}s/${cell}`}>
                              <Button className="bg-blue-500 text-white rounded">{headers[cellIndex].replace('Id', '').replace(/^./, (str) => str.toUpperCase())}</Button>

                            </Link>
                          </div>
                        ) : dateView ? (
                          <div className='min-w-52'>
                            <Datepicker
                              language="es-ES"
                              labelTodayButton="Fecha actual"
                              className="pointer-events-none"
                              minDate={new Date(cell)}
                              maxDate={new Date(cell)}
                            />
                          </div>
                        ) : statusView ? (
                          <div>
                            {cell === "Cancelado" && (
                              <Badge color="failure">Cancelado</Badge>
                            )}
                            {cell === "En progreso" && (
                              <Badge color="warning">En progreso</Badge>
                            )}
                            {cell === "Finalizado" && (
                              <Badge color="success">Finalizado</Badge>
                            )}
                          </div>
                        ) : totalView ? (
                          <div className="w-1/2 text-nowrap">{cell} €</div>
                        ) : birthdayView ? (
                          <div className="flex flex-row items-center gap-2 min-w-[275px]">
                            <div className='text-center'>{calculateAge(new Date(cell))} años</div>
                            <Datepicker
                              language="es-ES"
                              labelTodayButton="Fecha actual"
                              className="pointer-events-none"
                              minDate={new Date(cell)}
                              maxDate={new Date(cell)}
                            />
                          </div>
                        ) : (
                          <div className="w-1/2">{cell}</div>
                        )}
                      </div>
                    </td>

                  )
                })}
                <td className="p-4 text-center border">
                  <Button onClick={() => handleEditClick(row)}>Edit</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div >
  );
}
