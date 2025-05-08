import React, { useState } from "react";
import Header from "../components/Header";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Configuration = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [restorePassword, setRestorePassword] = useState("");
    const [restoreError, setRestoreError] = useState("");
    const [file, setFile] = useState(null);

    const handleBackupDownload = async () => {
        try {
            const response = await fetch(`${BASE_URL}/configuracion/descargar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Error desconocido");
                toast.error(data.error || "Error desconocido");
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "respaldo.json";
            a.click();
            window.URL.revokeObjectURL(url);
            setIsModalOpen(false);
            setPassword("");
            setError("");
            toast.success("Respaldo descargado exitosamente")
        } catch (error) {
            setError("Error al generar respaldo");
            toast.error("Error al generar respaldo");
            console.error(error);
        }
    };

    const handleRestore = async () => {
        if (!file) {
            setRestoreError("Selecciona un archivo de respaldo");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("password", restorePassword);

        try {
            const response = await fetch(`${BASE_URL}/configuracion/restaurar`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                setRestoreError(data.error || "Error desconocido");
                toast.error(data.error || "Error desconocido");
                return;
            }

            toast.success("La base de datos se ha restaurado exitosamente");
            setIsRestoreModalOpen(false);
            setRestorePassword("");
            setRestoreError("");
            setFile(null);
        } catch (error) {
            setRestoreError("Error al restaurar respaldo");
            toast.error("Error al restaurar respaldo");
            console.error(error);
        }
    };

    return (
        <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
            <TemporaryDrawer />
            <Header label="Configuración" />

            <div className="ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] flex items-start">
                <Card
                    label="Configuración"
                    icon="svgs/gear.svg"
                    classNames="w-[40%] h-[700px] flex flex-col justify-between p-5"
                >
                  <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3 text-black font-semibold">
                    <img src="/svgs/save-green.svg" alt="save icon" className="w-9 h-9" />
                    <span>Crear Respaldo de la Base de Datos</span>
                </div>
                <Button
                    label="Crear"
                    onClick={() => setIsModalOpen(true)}
                    classNames="hover:bg-[#4CAF50] bg-[#66BB6A] w-[30%] h-[3rem] text-white font-normal cursor-pointer"
                />
            </div>

            <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3 text-black font-semibold">
                    <img src="/svgs/upload-restore.svg" alt="upload icon" className="w-9 h-9" />
                    <span>Subir Respaldo de la Base de Datos</span>
                </div>
                <Button
                    label="Restablecer"
                    onClick={() => setIsRestoreModalOpen(true)}
                    classNames="hover:bg-[#CA5E5E] bg-[#E96D6D] w-[30%] h-[3rem] text-white font-normal cursor-pointer"
                />
            </div>

            </Card>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-999">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Ingresa la contraseña para crear respaldo</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                            placeholder="Contraseña"
                        />
                        {error && <p className="text-red-600 mb-2">{error}</p>}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setPassword("");
                                    setError("");
                                }}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleBackupDownload}
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isRestoreModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-999">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Restaurar respaldo</h2>
                        <input
                            type="password"
                            value={restorePassword}
                            onChange={(e) => setRestorePassword(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full mb-3"
                            placeholder="Contraseña"
                        />
                        <input
                            type="file"
                            accept=".json"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                        />
                        {restoreError && <p className="text-red-600 mb-2">{restoreError}</p>}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setIsRestoreModalOpen(false);
                                    setRestorePassword("");
                                    setRestoreError("");
                                    setFile(null);
                                }}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleRestore}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="bottom-right" autoClose={2500} />
        </div>
    );
};

export default Configuration;
