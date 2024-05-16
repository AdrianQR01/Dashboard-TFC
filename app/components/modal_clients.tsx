
import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";

export function ModalGeneral() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setOpenModal(true)}>+</Button>
      </div>
      <Modal show={openModal} position={modalPlacement} onClose={closeModal} className="fixed inset-0 flex items-center justify-center">
  <div className="bg-white w-96 rounded-lg shadow-lg">
    <div className="px-6 py-4">
      <h2 className="text-lg font-semibold">Añadir usuario</h2>
    </div>
    <div className="p-6">
      <form>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID:</label>
          <input type="text" id="id" name="id" required className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña:</label>
          <input type="password" id="contraseña" name="contraseña" required className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido:</label>
          <input type="text" id="apellido" name="apellido" required className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" id="email" name="email" required className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input type="tel" id="telefono" name="telefono" required className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full" />
        </div>
      </form>
    </div>
    <div className="px-6 py-4 bg-gray-100 flex justify-end">
      <button onClick={closeModal} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Cancelar</button>
    </div>
  </div>
</Modal>


  </>
  );
}
