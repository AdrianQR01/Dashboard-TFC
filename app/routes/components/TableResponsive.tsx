import { Modal, Dropdown, Checkbox, Button } from "flowbite-react";
import { useState } from "react";

interface Product {
    id: number;
    Category: string;
    Company: string;
    Product: string;
    Description: string;
    Price: number;
}

const labels = ['Category', 'Company', 'Product', 'Description', 'Price'];
const labelToPropMap: { [key: string]: keyof Product } = {
    'Category': 'Category',
    'Company': 'Company',
    'Product': 'Product',
    'Description': 'Description',
    'Price': 'Price',
};

export default function TableResponsive() {

    const [selectAll, setSelectAll] = useState(false);
    const [modalPlacement] = useState('center');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);

    const [data, setData] = useState<Product[]>([
        {
            id: 1,
            Category: "Electronics",
            Company: "Apple",
            Product: "iPhone 13",
            Description: "The latest iPhone with advanced features",
            Price: 999,
        },
        {
            id: 2,
            Category: "Clothing",
            Company: "Nike",
            Product: "Running Shoes",
            Description: "High-quality running shoes for athletes",
            Price: 89,
        },
        {
            id: 3,
            Category: "Books",
            Company: "Penguin Books",
            Product: "The Great Gatsby",
            Description: "Classic novel by F. Scott Fitzgerald",
            Price: 12,
        },
        {
            id: 4,
            Category: "Home Appliances",
            Company: "Samsung",
            Product: "Smart Refrigerator",
            Description: "Refrigerator with smart features and spacious design",
            Price: 14,
        },
    ]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedProducts(data.map(product => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleProductSelect = (id: number) => {
        if (!selectedProducts.includes(id)) {
            setSelectedProducts([...selectedProducts, id]);
        } else {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id));
        }
    };

    const closeModal = () => setOpenModal(false);

    const openAddUserModal = () => {
        setIsEditMode(false);
        setSelectedItem({} as Product); // Reset selected item
        setOpenModal(true);
    };

    const openEditUserModal = (item: Product) => {
        setIsEditMode(true);
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleSave = () => {
        if (selectedItem) {
            if (isEditMode) {
                setData(prevData => prevData.map(item => item.id === selectedItem.id ? selectedItem : item));
            } else {
                setData(prevData => [...prevData, selectedItem]);
            }
            closeModal();
        }
    };

    return (
        <div className="flex justify-center h-fit">
            <div className="w-fit sm:w-full md:w-full">
                {/* lg:min-w-[922px] sm:min-w-[922px] xl:min-w-[1150px] */}
                <div className="flex items-center justify-left m-4">
                    <Dropdown label="Acciones" dismissOnClick={false}>
                        <Dropdown.Item>Borrar todos</Dropdown.Item>
                        <Dropdown.Item className="visible sm:hidden md:hidden">Marcar todos</Dropdown.Item>
                    </Dropdown>
                    <Button onClick={openAddUserModal} className="ml-2">Añadir Cliente</Button>
                </div>
                <div className="w-full">
                    <div className="overflow-x-auto">
                        <table className="sm:inline-table w-full flex flex-row sm:bg-white overflow-hidden">
                            <thead className="text-black ">
                                {data.map((product, index) => (
                                    <tr
                                        className={`bg-none sm:bg-[#222E3A]/[6%]  flex flex-col sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 ${index == 0 ? "sm:flex" : "sm:hidden"}`}
                                        key={index}
                                    >
                                        <th className="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none hidden sm:table-cell">
                                            <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                        </th>

                                        <th className="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">
                                            ID
                                        </th>
                                        <th className="py-3 px-5 text-left border border-b">
                                            Category
                                        </th>
                                        <th className="py-3 px-5 text-left border border-b">
                                            Company
                                        </th>
                                        <th className="py-3 px-5 text-left border border-t">
                                            Price
                                        </th>
                                        <th className={`${index === data.length - 1 ? 'bg-red-500' : 'bg-red-500'} py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none invisible sm:table-cell`}>
                                            Edit
                                        </th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="">
                                {data.map((product, index) => (
                                    <tr key={index} className="hover:bg-[#222E3A]/[6%] flex flex-col sm:table-row mb-2 sm:mb-0">
                                        <td className="border hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent py-3 px-5 hidden sm:table-cell">
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => handleProductSelect(product.id)}
                                                disabled={index !== 0 && selectAll}
                                            />
                                        </td>
                                        <td className="flex flex-row hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent sm:border-x-0 border-y-0.5 border sm:rounded-none rounded-tr-lg py-3 px-5">
                                            <div className="visible pr-3 sm:hidden">
                                                <Checkbox
                                                    checked={selectedProducts.includes(product.id)}
                                                    onChange={() => handleProductSelect(product.id)}
                                                    disabled={index !== 0 && selectAll}
                                                    className="mb-0.5 cursor-pointer"
                                                />
                                            </div>
                                            {product.id}
                                        </td>
                                        <td className="border py-3 px-5">
                                            {product.Category}
                                        </td>
                                        <td className="border py-3 px-5">
                                            {product.Company}
                                        </td>
                                        <td className="border py-3 px-5">
                                            {"$" + product.Price}
                                        </td>
                                        <td className="border py-3 px-5 cursor-pointer">
                                            <button onClick={() => openEditUserModal(product)}>Edit</button>
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
                                    {isEditMode && selectedItem && (
                                        <div className="mb-4">
                                            <p className="text-gray-700"><strong>ID:</strong> {selectedItem.id}</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        {labels.map((label) => (
                                            <div key={label} className="flex flex-col">
                                                <label htmlFor={label.toLowerCase()} className="text-gray-700 capitalize">{label}:</label>
                                                <input
                                                    type={label.toLowerCase() === 'contraseña' ? 'password' : 'text'}
                                                    id={label.toLowerCase()}
                                                    name={label.toLowerCase()}
                                                    required
                                                    className="mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                                                    placeholder={label}
                                                    value={selectedItem ? selectedItem[labelToPropMap[label]] || '' : ''}
                                                    onChange={(e) => {
                                                        if (selectedItem) {
                                                            setSelectedItem({ ...selectedItem, [labelToPropMap[label]]: e.target.value });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={closeModal}>Cancelar</Button>
                            <Button onClick={handleSave}>Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
