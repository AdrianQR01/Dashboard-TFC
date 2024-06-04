interface Product {
    id: number;
    Category: string;
    Company: string;
    Product: string;
    Description: string;
    Price: number;
}
interface ModalEditFormProps {
    product: any;
    onClose: () => void;
    onSave: (updatedProduct: any) => void;
    onDelete: (id: number) => void; // Añade esta línea
  }