import { Form } from "@remix-run/react";
import { Modal, TextInput, Button, Datepicker, Select } from "flowbite-react";
import { useEffect, useState } from "react";

interface ModalEditFormProps {
    data: { [key: string]: any };
    onClose: () => void;
    onSave: (updatedData: { [key: string]: any }) => void;
    onDelete: (id: string | number) => void;
}

export function ModalEditForm({ data, onClose, onSave, onDelete }: ModalEditFormProps) {
    const initialState = data ? { ...data } : {};
    const [formData, setFormData] = useState<{ [key: string]: any }>(initialState);
    const [fechaInicio, setFechaInicio] = useState<Date | null>(new Date());
    const [fechaFin, setFechaFin] = useState<Date | null>(new Date());
    const [estado, setEstado] = useState<string | null>("En progreso");

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            fechaInicio: fechaInicio ? fechaInicio.toISOString() : null,
        }));
    }, [fechaInicio]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            fechaFin: fechaFin ? fechaFin.toISOString() : null,
        }));
    }, [fechaFin]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            estado: estado
        }));
    }, [estado]);

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
                <Form method="post">
                    <div className="space-y-6">
                        {Object.keys(formData).map((key: string) => (
                            key !== 'id' && (
                                (key.includes('fecha') && fechaInicio && fechaFin) ? (
                                    <div key={key}>
                                        <label className="block text-sm text-gray-700" htmlFor={key}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                        </label>
                                        <Datepicker
                                            language="es-ES"
                                            labelTodayButton="Fecha actual"
                                            name={key}
                                            onSelectedDateChanged={(date) => (key.includes("fechaInicio") ? setFechaInicio(date) : setFechaFin(date))}
                                        />
                                    </div>
                                ) : key.includes('estado') && estado ? (
                                    <div key={key}>
                                        <label className="block text-sm text-gray-700" htmlFor={key}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                        </label>
                                        <Select id={key} name={key} required onChange={(e) => setEstado(e.target.value)}>
                                            <option value="En progreso">En progreso</option>
                                            <option value="Cancelado">Cancelado</option>
                                            <option value="Finalizado">Finalizado</option>
                                        </Select>
                                    </div>
                                ) : (
                                    !key.includes('fecha') && !key.includes('estado') && (
                                        <TextInput
                                            key={key}
                                            placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim()}
                                            value={formData[key] || ''}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                        />
                                    )
                                )
                            )
                        ))}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={handleSave}>{data?.id ? "Save" : "Add"}</Button>
                {data?.id && <Button color="red" onClick={handleDelete}>Delete</Button>}
                <Button color="gray" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}
