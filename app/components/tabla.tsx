import { useState } from 'react';
import { Modal, Button } from "flowbite-react";

interface Item {
  id: number;
  productName: string;
  color: string;
  category: string;
  price: string;
}

export function Tabla() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleToggleSelectAll = () => {
    setSelectedItems(selectedItems.length === data.length ? [] : data.map(item => item.id));
  };

  const handleToggleSelectItem = (id: number) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(itemId => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  /*  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
    closeModal(); // Cierra el modal después de enviar el formulario
  };  */ 

  /* ESTO VA DEBAJO DE ONCLICK DE CANCELAR
  <Button onClick={handleSubmit}>Guardar</Button>
  */

  const closeModal = () => {
    setOpenModal(false);
  };

  const data: Item[] = [
    { id: 1, productName: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
    { id: 2, productName: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
    { id: 3, productName: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
    { id: 4, productName: 'Apple Watch', color: 'Silver', category: 'Accessories', price: '$179' },
    { id: 5, productName: 'iPad', color: 'Gold', category: 'Tablet', price: '$699' },
    { id: 6, productName: 'Apple iMac 27"', color: 'Silver', category: 'PC Desktop', price: '$3999' },
  ];

  const tableRows = data.map(item => (
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
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.productName}</td>
      <td className="px-6 py-4">{item.color}</td>
      <td className="px-6 py-4">{item.category}</td>
      <td className="px-6 py-4">{item.price}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => setOpenModal(true)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            <th className="px-6 py-4">Product Name</th>
            <th className="px-6 py-4">Color</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <Modal show={openModal} position={modalPlacement} onClose={closeModal}>
      <Modal.Header>Añadir usuario</Modal.Header>
      <Modal.Body>
      <div className="bg-gray-100 rounded-lg shadow-md p-8 space-y-6">
  <form>
    <div className="flex flex-col">
      <label htmlFor="id" className="text-gray-700">ID:</label>
      <input type="text" id="id" name="id" required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="nombre" className="text-gray-700">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="contraseña" className="text-gray-700">Contraseña:</label>
      <input type="password" id="contraseña" name="contraseña" required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="apellido" className="text-gray-700">Apellido:</label>
      <input type="text" id="apellido" name="apellido" required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-700">Email:</label>
      <input type="email" id="email" name="email" required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
    <div className="flex flex-col">
      <label htmlFor="telefono" className="text-gray-700">Teléfono:</label>
      <input type="tel" id="telefono" name="telefono" required className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
  </form>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
