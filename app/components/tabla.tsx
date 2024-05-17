import { Button, Modal } from "flowbite-react";
import { useState, useCallback } from 'react';
import React from 'react';


interface Item {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

const labels = ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono'];

export const Tabla = React.memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleSelectAll = () => {
    setSelectedItems(selectedItems.length === data.length ? [] : data.map(item => item.id));
  };

  const handleToggleSelectItem = useCallback((id: number) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(itemId => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  }, [setSelectedItems]);

  const closeModal = () => setOpenModal(false);
  const openAddUserModal = () => { setIsEditMode(false); setOpenModal(true); };
  const openEditUserModal = () => { setIsEditMode(true); setOpenModal(true); };

  const data: Item[] = [
    { id: 1, nombre: 'Apple MacBook Pro 17"', apellido: 'Silver', email: 'Laptop', telefono: '+34 5454346' },
    { id: 2, nombre: 'Microsoft Surface Pro', apellido: 'White', email: 'Laptop PC', telefono: '+34 5454346' },
    { id: 3, nombre: 'Magic Mouse 2', apellido: 'Black', email: 'Accessories', telefono: '+34 5454346' },
    { id: 4, nombre: 'Apple Watch', apellido: 'Silver', email: 'Accessories', telefono: '+34 5454346' },
    { id: 5, nombre: 'iPad', apellido: 'Gold', email: 'Tablet', telefono: '+34 5454346' },
    { id: 6, nombre: 'Apple iMac 27"', apellido: 'Silver', email: 'PC Desktop', telefono: '+34 5454346' },
  ];

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between p-4">
          <h1 className="text-lg font-semibold">Clientes</h1>
          <Button onClick={openAddUserModal}>Añadir Cliente</Button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-title"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={selectedItems.length === data.length}
                    onChange={handleToggleSelectAll}
                  />
                  <label htmlFor="checkbox-table-title" className="sr-only">checkbox</label>
                </div>
              </th>
              <th className="px-6 py-4">Id</th>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Apellido</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Telefono</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-${item.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleToggleSelectItem(item.id)}
                    />
                    <label htmlFor={`checkbox-table-${item.id}`} className="sr-only">checkbox</label>
                  </div>
                </td>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.nombre}</td>
                <td className="px-6 py-4">{item.apellido}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.telefono}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={openEditUserModal}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={openModal} position={modalPlacement} onClose={closeModal}>
        <Modal.Header>{isEditMode ? 'Editar Usuario' : 'Añadir Usuario'}</Modal.Header>
        <Modal.Body>
          <div className="bg-gray-100 rounded-md shadow-md p-8 space-y-6">
            <form>
              {labels.map(label => (
                <div key={label} className="flex flex-col">
                  <label htmlFor={label.toLowerCase()} className="text-gray-700 capitalize">{label}:</label>
                  <input type={label.toLowerCase() === 'contraseña' ? 'password' : 'text'} id={label.toLowerCase()} name={label.toLowerCase()} required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                </div>
              ))}
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={closeModal}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

