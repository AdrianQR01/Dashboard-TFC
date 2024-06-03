import { Modal, TextInput, Button } from "flowbite-react";
import { useState } from "react";

export function ModalEditForm({ product, onClose, onSave, onDelete }: ModalEditFormProps) {
  const [category, setCategory] = useState(product.Category);
  const [company, setCompany] = useState(product.Company);
  const [description, setDescription] = useState(product.Description);
  const [price, setPrice] = useState(product.Price);

  const handleSave = () => {
      const updatedProduct = {
          ...product,
          Category: category,
          Company: company,
          Description: description,
          Price: price
      };
      onSave(updatedProduct);
  };

  const handleDelete = () => {
      onDelete(product.id);
  };

  return (
      <Modal show={true} onClose={onClose}>
          <Modal.Header>{product.id ? "Edit Product" : "Add Product"}</Modal.Header>
          <Modal.Body>
              <div className="space-y-6">
                  <TextInput
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                  />
                  <TextInput
                      placeholder="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                  />
                  <TextInput
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextInput
                      placeholder="Price"
                      value={price.toString()}
                      onChange={(e) => setPrice(Number(e.target.value))}
                  />
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={handleSave}>{product.id ? "Save" : "Add"}</Button>
              {product.id && <Button color="red" onClick={handleDelete}>Delete</Button>}
              <Button color="gray" onClick={onClose}>
                  Cancel
              </Button>
          </Modal.Footer>
      </Modal>
  );
}
