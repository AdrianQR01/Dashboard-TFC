import { Modal, TextInput, Button } from "flowbite-react";
import { useState } from "react";

interface ModalEditFormProps {
    data: { [key: string]: any };
    onClose: () => void;
    onSave: (updatedData: { [key: string]: any }) => void;
    onDelete: (id: string | number) => void;
}

export function ModalEditForm({ data, onClose, onSave, onDelete }: ModalEditFormProps) {
    const initialState = data ? { ...data } : {};
    const [formData, setFormData] = useState<{ [key: string]: any }>(initialState);

    const handleChange = (key: string, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handleDelete = () => {
        onDelete(data.id);
    };

    return (
        <Modal show={true} onClose={onClose}>
            <Modal.Header>{data?.id ? "Edit Data" : "Add Data"}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    {Object.keys(formData).map((key: string) => (
                        key !== 'id' && (
                            <TextInput
                                key={key}
                                placeholder={key}
                                value={formData[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                            />
                        )
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={handleSave}>{data?.id ? "Save" : "Add"}</Button>
                {data?.id && <Button color="red" onClick={handleDelete}>Delete</Button>}
                <Button color="gray" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
