interface Product {
    id: number;
    Category: string;
    Company: string;
    Product: string;
    Description: string;
    Price: number;
}
interface ModalEditFormProps {
    product: Product;
    onClose: () => void;
    onSave: (updatedProduct: Product) => void;
    onDelete: (id: number) => void; // Añade esta línea
  }