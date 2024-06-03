import { Dropdown, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
import { ModalEditForm } from "./ModalEditForm";

interface Product {
    id: number;
    Category: string;
    Company: string;
    Product: string;
    Description: string;
    Price: number;
}


export default function TableResponsive() {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
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
            Price: 1400,
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

    const handleCheckboxChange = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const handleEditClick = (product: Product) => {
        setEditProduct(product);
    };

    const handleNewProductClick = () => {
        const newProduct: Product = {
            id: data.length + 1,
            Category: "",
            Company: "",
            Product: "",
            Description: "",
            Price: 0,
        };
        setEditProduct(newProduct);
    };

    const handleModalClose = () => {
        setEditProduct(null);
    };

    const handleProductSave = (updatedProduct: Product) => {
        if (data.some(product => product.id === updatedProduct.id)) {
            setData(prevData =>
                prevData.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
        } else {
            setData(prevData => [...prevData, updatedProduct]);
        }
        setEditProduct(null);
    };

    const handleProductDelete = (id: number) => {
        setData(prevData => prevData.filter(product => product.id !== id));
        setEditProduct(null);
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
                    <Button onClick={handleNewProductClick}>
                        Añadir producto
                    </Button>
                    {editProduct && (
                        <ModalEditForm
                            product={editProduct}
                            onClose={handleModalClose}
                            onSave={handleProductSave}
                            onDelete={handleProductDelete} // Añade esta línea
                        />
                    )}
                </div>
                <div className="w-full">
                    <div className="overflow-x-auto">
                        <table className="sm:inline-table w-full flex flex-row sm:bg-white overflow-hidden">
                            <thead className="text-black">
                                {data.map((product, index) => (
                                    <tr
                                        className={`border sm:bg-[#222E3A]/[6%] flex flex-col sm:table-row rounded-l-lg mb-2 sm:rounded-none ${index == 0 ? "sm:flex" : "sm:hidden"}`}
                                        key={index}
                                    >
                                        <th className="py-3 px-5 text-left rounded-tl-lg sm:rounded-none hidden sm:table-cell">
                                            <h1 className="hidden">Seleccionar todos</h1>
                                            <Checkbox
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>

                                        <th className="py-3 px-5 text-left rounded-tl-lg sm:rounded-none border-b sm:border-none">
                                            ID
                                        </th>
                                        <th className="py-3 px-5 text-left border-b sm:border-none">
                                            Category
                                        </th>
                                        <th className="py-3 px-5 text-left border-b sm:border-none">
                                            Company
                                        </th>
                                        <th className="py-3 px-5 text-left border-b sm:border-none">
                                            Price
                                        </th>
                                        <th className={`${index === data.length - 1 ? 'bg-red-500' : 'bg-red-500'} py-3 px-5 text-left  -t rounded-bl-lg sm:rounded-none invisible sm:table-cell`}>
                                            Edit
                                        </th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {data.map((product, index) => (
                                    <tr key={index} className="hover:bg-[#222E3A]/[6%] flex flex-col sm:table-row sm:border border-y border-r rounded-r-lg mb-2">

                                        <td className="hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent py-3 px-5 hidden sm:table-cell">
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => handleCheckboxChange(product.id)}
                                            />
                                        </td>
                                        <td className="py-3 px-5 border-b sm:border-none">
                                            {product.id}
                                        </td>
                                        <td className="py-3 px-5 border-b sm:border-none">
                                            {product.Category}
                                        </td>
                                        <td className="py-3 px-5 border-b sm:border-none">
                                            {product.Company}
                                        </td>
                                        <td className="py-3 px-5 border-b sm:border-none">
                                            {"$" + product.Price}
                                        </td>
                                        <td className="py-3 px-5 cursor-pointer">
                                            <button onClick={() => handleEditClick(product)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );

}
