import { useState } from 'react';
import { Modal, Button } from "flowbite-react";

export function Tabla() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center');
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
  };

  const handleIndividualChange = () => {
    if (!selectAllChecked) {

    }
  };

  const data = [
    { id: 1, productName: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
    { id: 2, productName: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
    { id: 3, productName: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
    { id: 4, productName: 'Apple Watch', color: 'Silver', category: 'Accessories', price: '$179' },
    { id: 5, productName: 'iPad', color: 'Gold', category: 'Tablet', price: '$699' },
    { id: 6, productName: 'Apple iMac 27"', color: 'Silver', category: 'PC Desktop', price: '$3999' },
  ];

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
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
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
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-${item.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={selectAllChecked ? true : undefined} // Si selectAllChecked es true, marca todos los checkboxes, de lo contrario, deja el estado indefinido
                    onChange={handleIndividualChange} // Usa una función diferente para el cambio de estado individual
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
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Renderiza el modal */}
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={closeModal}
      >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>I accept</Button>
          <Button color="gray" onClick={closeModal}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );  
}
