import React from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox.jsx";
import Button from "../components/Button";
import CalendarComponent from "../components/CalendarComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEquipment,
  fetchAddNewDevice,
  fetchUpdateDevice,
  fetchDeleteDevice,
  fetchAddReservation,
  fetchAddMaintenance,
  fetchDeleteReservation,
  fetchDeleteMaintenance,
} from "../services/fetchers.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import { DateTime } from "luxon";

// url base para las imagenes
 const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const Equipment = () => {
  /* tanstack */

  const queryClient = useQueryClient();

  /* tanstack */
  const { data: equipment } = useQuery({
    queryKey: ["equipment"],
    queryFn: fetchEquipment,
  });

  // constants

  const fileInputRefAdd = useRef(null);
  const fileInputRefEdit = useRef(null);

  const TAB_TYPE = {
    CALENDARIZADO: "calendarizado",
    DETALLES: "detalles",
    AGREGAR: "agregar",
    EDITAR: "editar",
  };

  const SCHEDULE_TYPE = {
    MANTENIMIENTO: "mantenimiento",
    USO: "uso",
  };

  // use states

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [originalDevice, setOriginalDevice] = useState(null);
  const [editDevice, setEditDevice] = useState(null);
  const [newDevice, setNewDevice] = useState({
    nombre: "",
    descripcion: "",
    file: null,
    requiereMantenimiento: false,
    //status: "Liberado",
  });
  const [scheduleType, setScheduleType] = useState(SCHEDULE_TYPE.USO);
  const [reservations, setReservations] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [search, setSearch] = useState("");

  /* use effect */

  useEffect(() => {
    setSelectedRange([]);
  }, [selectedEquipment]);

  useEffect(() => {
    if (!selectedEquipment) return;

    setReservations(selectedEquipment?.reservas || []);
    setMaintenances(selectedEquipment?.mantenimientos || []);
    console.log("reservations: ", selectedEquipment?.reservas);
    console.log("maintenances: ", selectedEquipment?.mantenimientos);
  }, [selectedEquipment]);

  useEffect(() => {
    /*
    tienen esta anatomía:

    ya que selectedReactant es sacado de equipos que fetcheamos

  {
    "_id": "6813fbb4557133f6b21457cd",
    "nombre": "Microscopio Digital",
    "descripcion": "Microscopio con cámara integrada para análisis detallado",
    "urlImagen": "https://m.media-amazon.com/images/I/51eFrgkJHjL._AC_UF894,1000_QL80_.jpg",
    "requiereMantenimiento": false,
    "status": "Liberado",
    "mantenimientos": [],
    "reservas": []
  }

    */
    setEditDevice(JSON.parse(JSON.stringify(selectedEquipment)));
    setOriginalDevice(JSON.parse(JSON.stringify(selectedEquipment)));
  }, [selectedEquipment]);

  useEffect(() => {
    console.log("new device props: ", newDevice);
  }, [newDevice]);

  /* functions */

  const deleteRangeDates = async (date) => {
    const reservationObj = reservations.find((reservation) => {
      const startDate = DateTime.fromISO(reservation.fechaInicio, {
        zone: "America/Hermosillo",
      }).toJSDate();

      const endDate = DateTime.fromISO(reservation.fechaFin, {
        zone: "America/Hermosillo",
      }).toJSDate();

      return startDate <= date && date <= endDate;
    });

    const reservationId = reservationObj?._id;

    const maintenanceObj = maintenances.find((maintenance) => {
      const startDate = DateTime.fromISO(maintenance.fechaInicio, {
        zone: "America/Hermosillo",
      }).toJSDate();

      const endDate = DateTime.fromISO(maintenance.fechaFin, {
        zone: "America/Hermosillo",
      }).toJSDate();

      return startDate <= date && date <= endDate;
    });

    const maintenanceId = maintenanceObj?._id;

    if (reservationId) {
      console.log("borrando reserva :) con id de: " + reservationId);
      const res = await fetchDeleteReservation(reservationId);
      if (res.ok) {
        toast.success("Reserva eliminada correctamente");
        queryClient.invalidateQueries(["equipment"]);
        setSelectedEquipment(null);
        setActiveTab(null);
      } else {
        toast.error("Error al eliminar reserva");
        throw new Error("Error al eliminar reserva");
      }
    } else if (maintenanceId) {
      console.log("borrando mantenimiento  :) con id de: " + maintenanceId);
      const res = await fetchDeleteMaintenance(maintenanceId);
      if (res.ok) {
        toast.success("Mantenimiento eliminado correctamente");
        queryClient.invalidateQueries(["equipment"]);
        setSelectedEquipment(null);
        setActiveTab(null);
      } else {
        toast.error("Error al eliminar mantenimiento");
        throw new Error("Error al eliminar mantenimiento");
      }
    }
  };

  const formatDate = (date) => {
    return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
  };

  const handleSaveSchedule = async () => {
    //uso
    if (scheduleType === SCHEDULE_TYPE.USO) {
      console.log("Calendarizando uso del equipo...");

      const body = {
        persona: "Usuario del Laboratorio",
        fechaInicio: formatDate(selectedRange[0]),
        fechaFin: formatDate(selectedRange[1]),
      };

      //ASÍ debería ser, pero el back no funciona bien en reservas/uso
      const res = await fetchAddReservation(body, selectedEquipment?._id);
      if (res.ok) {
        toast.success("Reserva calendarizada correctamente");
        queryClient.invalidateQueries(["equipment"]);
        setActiveTab(null);
      } else {
        toast.error("Error al calendarizar reserva");
        throw new Error("Error al calendarizar reserva");
      }

      /* await fetchAddReservation(body, selectedEquipment?._id);
      toast.success("Reserva calendarizada correctamente");
      queryClient.invalidateQueries(["equipment"]);
      setSelectedEquipment(null);
      setActiveTab(null); */
    }

    // mantenimiento
    if (scheduleType === SCHEDULE_TYPE.MANTENIMIENTO) {
      console.log("Calendarizando mantenimiento del equipo...");

      const body = {
        fechaInicio: formatDate(selectedRange[0]),
        fechaFin: formatDate(selectedRange[1]),
        descripcion: "Mantenimiento programado",
      };

      const res = await fetchAddMaintenance(body, selectedEquipment?._id);
      if (res.ok) {
        toast.success("Mantenimiento programado correctamente");
        queryClient.invalidateQueries(["equipment"]);
        setSelectedEquipment(null);
        setActiveTab(null);
      } else {
        toast.error("Error al calendarizar reserva");
        throw new Error("Error al calendarizar reserva");
      }
    }
  };

  const checkEntries = (device) => {
    if (!device.nombre) {
      toast.error("Nombre del equipo es requerido");
      return false;
    }
    if (!device.descripcion) {
      toast.error("Descripción del equipo es requerido");
      return false;
    }
    if (!device.file) {
      toast.error("Imagen del equipo es requerida");
      return false;
    }
    return true;
  };

  const checkEntriesEdit = (device) => {
    if (!device.nombre) {
      toast.error("Nombre del equipo es requerido");
      return false;
    }
    if (!device.descripcion) {
      toast.error("Descripción del equipo es requerido");
      return false;
    }
    if (!device.file && !originalDevice?.urlImagen) {
      toast.error("Imagen del equipo es requerida");
      return false;
    }
    return true;
  };

  const updateEquipment = async (updatedDevice) => {
    console.log("Updating device: ", updatedDevice);

    const img = updatedDevice?.file || originalDevice?.file;

    const formData = new FormData();
    formData.append("nombre", updatedDevice?.nombre);
    formData.append("descripcion", updatedDevice?.descripcion);
    formData.append("imagen", img);
    formData.append(
      "requiereMantenimiento",
      updatedDevice?.requiereMantenimiento
    );
    //formData.append("status", newDevice?.status);
    const device_id = updatedDevice?._id;

    const response = await fetchUpdateDevice(formData, device_id);

    if (response.ok) {
      toast.success("Equipo actualizado correctamente");
      queryClient.invalidateQueries(["equipment"]);
      setEditDevice({
        nombre: "",
        descripcion: "",
        file: null,
        requiereMantenimiento: false,
        //status: "Liberado",
      });
      setOriginalDevice(null);
      setActiveTab(null);
    } else {
      toast.error("Error al actualizar Equipo");
      throw new Error("Error al actualizar Equipo");
    }
  };

  const addEquipment = async (newDevice) => {
    console.log("Adding new device: ", newDevice);
    const formData = new FormData();
    formData.append("nombre", newDevice?.nombre);
    formData.append("descripcion", newDevice?.descripcion);
    formData.append("imagen", newDevice?.file);
    formData.append("requiereMantenimiento", newDevice?.requiereMantenimiento);
    //formData.append("status", newDevice?.status);

    const response = await fetchAddNewDevice(formData);

    if (response.ok) {
      toast.success("Equipo agregado correctamente");
      queryClient.invalidateQueries(["equipment"]);
      setNewDevice({
        nombre: "",
        descripcion: "",
        file: null,
        requiereMantenimiento: false,
        //status: "Liberado",
      });
    } else {
      toast.error("Error al agregar Equipo");
      throw new Error("Error agregar equipment");
    }
  };

  return (
    <div className="bg-[#CAC9C9] w-screen h-screen relative m-0 overflow-hidden">
      <ToastContainer position="bottom-right" autoClose={2500} />

      <div
        className={`ml-[250px] mt-[5rem] w-[calc(100vw-250px)]
           h-[calc(100vh-5rem)] bg-[#CAC9C9] overflow-hidden p-5 relative`}
      >
        {/* this is pushing everything else below the header */}
        <div className="flex flex-row w-[40%] h-[12%]">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            classNames="w-[280px] h-[3rem] mb-5"
          />
          <Button
            label="Añadir Equipo"
            onClick={() => {
              setActiveTab(TAB_TYPE.AGREGAR);
            }}
            classNames="cursor-pointer hover:bg-add-green-hover bg-add-green ml-4 w-[12rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
          />
        </div>

        {/*panel equipos de laboratorio  */}
        <div className="w-[40%] h-[80%] flex flex-col absolute ">
          <div className="relative w-full h-full  bg-white shadow-md rounded-md overflow-hidden">
            <div className="absolute bg-primary w-full h-[3rem] flex items-center ">
              <p className="ml-5 text-white font-bold">Equipo de Laboratorio</p>
            </div>

            <div className="w-full mt-[3rem] h-[calc(100%-5rem)] flex flex-col bg-white   items-center overflow-y-auto">
              {/* individual cards para cada equipo */}
              {equipment
                ?.filter((device) =>
                  device?.nombre.toLowerCase().includes(search.toLowerCase())
                )
                .map((device, index) => (
                  <div
                    key={index}
                    className="w-[95%] h-[8rem] min-h-[8rem] max-h-[8rem]  bg-gray-200 shadow-sm rounded-md relative mt-4 mb-2 "
                  >
                    <div className="flex justify-center items-center h-[8rem] min-h-[8rem] max-h-[8rem] w-[10rem] bg-white overflow-hidden border-4 border-dotted border-gray-300">
                      <img
                        className="w-full h-full object-contain"
                        src={`${backendBaseUrl}${device?.urlImagen}`}
                        alt="device image"
                      />
                    </div>

                    <img
                      onClick={() => {
                        console.log("Execute Task...");
                        setSelectedEquipment(device);
                        setActiveModal(true);
                      }}
                      className="absolute top-3 right-3 cursor-pointer"
                      src="/svgs/trash-red.svg"
                      width={33}
                      alt="arrow svg"
                    />
                    <span className=" absolute top-3 left-[44%] font-bold -translate-x-[2rem]">
                      {device?.nombre}
                    </span>
                    <span
                      className={`absolute bottom-4 left-[37%] rounded-full py-1 px-4 ${
                        device?.status === "Liberado"
                          ? "bg-green-400 text-white"
                          : "bg-black text-white"
                      }`}
                    >
                      {device?.status}
                    </span>
                    <div className="absolute bottom-4 right-3 flex gap-x-4">
                      <img
                        src="/svgs/edit-black.svg"
                        width={34}
                        alt="edit"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedEquipment(device);
                          setActiveTab(TAB_TYPE.EDITAR);
                        }}
                      />
                      <img
                        src="/svgs/calendar-black.svg"
                        width={34}
                        alt="calendar"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedEquipment(device);
                          setActiveTab(TAB_TYPE.CALENDARIZADO);
                        }}
                      />
                      <img
                        src="/svgs/information.svg"
                        width={34}
                        alt="info"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedEquipment(device);
                          setActiveTab(TAB_TYPE.DETALLES);
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* panel de detalles del equipo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.DETALLES
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          } `}
        >
          <div className="absolute bg-primary w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 font-bold text-white">
              Eliminar reservas/mantenimientos
            </p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem] relative">
            <h1 className="text-lg font-bold mt-2">
              {selectedEquipment?.nombre}
            </h1>
            {/*<p className="text-sm text-center w-[95%] my-4">
              {selectedEquipment?.descripcion}
            </p> */}
            <div className=" flex flex-row justify-around mt-4 w-[70%] items-center">
              <span className="text-sm font-bold">Días Calendarizados:</span>
            </div>
            <p className="mt-2">
              <span className="mr-4 px-4 py-1 bg-red-400 text-sm font-medium rounded-full">
                En Uso
              </span>
              <span className="px-4 py-1 bg-orange-400 text-sm font-medium rounded-full">
                En Mantenimiento
              </span>
            </p>
            <div className="scale-[0.80]  flex flex-col items-center justify-center">
              <CalendarComponent
                reservations={reservations}
                maintenances={maintenances}
                selectedRange={selectedDate}
                onChangeRange={setSelectedDate}
                applyRange={false}
              ></CalendarComponent>
            </div>
          </div>
          <Button
            label="Limpiar"
            onClick={async () => {
              if (!selectedDate) return;
              await deleteRangeDates(selectedDate);
            }}
            classNames="cursor-pointer  bg-[#EDEDED] border-1 text-black w-[8rem] h-[2rem] shadow-md rounded-md text-bold text-xl mx-auto bottom-8"
          />
        </div>

        {/* panel calendarización de equipo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.CALENDARIZADO
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          }`}
        >
          <div className="absolute bg-primary w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 text-white font-bold">
              Calendarizar uso del Equipo
            </p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center  mt-[3rem] relative">
            <h1 className="text-lg font-bold mt-2">
              {selectedEquipment?.nombre}
            </h1>
            <p className="text-base font-base my-2">
              Haga click para alternar entre mantenimiento y uso
            </p>
            <p
              onClick={() => {
                if (scheduleType === SCHEDULE_TYPE.USO) {
                  setScheduleType(SCHEDULE_TYPE.MANTENIMIENTO);
                } else {
                  setScheduleType(SCHEDULE_TYPE.USO);
                }
              }}
              className={`cursor-pointer w-[12rem] text-center my-2 font-bold text-base rounded-full mx-2 px-4 py-2 ${
                scheduleType === SCHEDULE_TYPE.USO
                  ? "bg-red-400"
                  : "bg-orange-400"
              } `}
            >
              {scheduleType}
            </p>

            <div className="scale-[0.80] absolute top-26  flex flex-col items-center justify-center">
              <CalendarComponent
                reservations={reservations}
                maintenances={maintenances}
                selectedRange={selectedRange}
                onChangeRange={setSelectedRange}
                applyRange={true}
              ></CalendarComponent>
            </div>
          </div>
          <Button
            label="Guardar"
            onClick={async () => {
              await handleSaveSchedule();
            }}
            classNames="cursor-pointer hover:bg-add-green-hover bg-add-green w-[8rem] h-[2rem] shadow-md absolute bottom-2 mx-auto rounded-md text-bold text-white text-xl"
          />
        </div>

        {/* panel de agregar equipo nuevo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.AGREGAR
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          } `}
        >
          <div className="absolute bg-primary w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 font-bold text-white">Agregar un equipo</p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem] relative">
            <div className="mt-6 w-full flex justify-center">
              <TextField
                label="Nombre del equipo"
                sx={{ width: "90%" }}
                value={newDevice?.nombre}
                onChange={(e) => {
                  setNewDevice({ ...newDevice, nombre: e.target.value });
                }}
              ></TextField>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <TextField
                label="Descripción del equipo"
                multiline
                rows={3}
                sx={{ width: "90%" }}
                value={newDevice?.descripcion}
                onChange={(e) => {
                  setNewDevice({ ...newDevice, descripcion: e.target.value });
                }}
              ></TextField>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefAdd}
              style={{
                position: "absolute",
                top: "-9999px",
                left: "-9999px",
                opacity: "0",
                width: "1px",
                height: "1px",
                pointerEvents: "none",
              }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewDevice({ ...newDevice, file: file });
                }
              }}
            />
            <div
              onClick={() => {
                if (fileInputRefAdd.current) {
                  fileInputRefAdd.current.click();
                }
              }}
              className="bg-[#F0E6F7] cursor-pointer mt-4 w-[90%] h-[4rem] flex flex-row items-center justify-center border-dotted border-4 border-[#AFAFAF] rounded-md "
            >
              <img src="/svgs/upload-purple.svg" alt="upload icon" width={40} />
              <span className="text-lg ml-4">Subir Imagen</span>
            </div>
            <div className="mt-6 flex justify-center items-center h-[8rem] min-h-[8rem] max-h-[8rem] w-[10rem] bg-white overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={
                  newDevice?.file
                    ? URL.createObjectURL(newDevice?.file)
                    : "/images/empty.png"
                }
                alt="machine img"
                width={130}
              />
            </div>

            <div className="mt-4 w-[80%] flex flex-row justify-around">
              <Button
                label="Cancelar"
                onClick={() => {
                  setNewDevice({
                    nombre: "",
                    descripcion: "",
                    file: null,
                    requiereMantenimiento: false,
                  });
                  setActiveTab(null);
                }}
                classNames="cursor-pointer  bg-[#EDEDED] border-1 text-black w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-xl"
              />
              <Button
                label="Agregar"
                onClick={async () => {
                  if (!checkEntries(newDevice)) {
                    return;
                  }

                  await addEquipment(newDevice);
                }}
                classNames="cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] w-[10rem] h-[2.5rem] shadow-md rounded-md text-bold text-white text-xl"
              />
            </div>
          </div>
        </div>

        {/* panel de editar equipo */}
        <div
          className={` ${
            activeTab === TAB_TYPE.EDITAR
              ? "absolute w-[40%] h-[90%]  left-[45%] top-[5%] flex flex-col bg-white rounded-md shadow-md"
              : "hidden"
          } `}
        >
          <div className="absolute bg-primary w-full h-[3rem] flex items-center rounded-t-md ">
            <p className="ml-5 text-white font-bold">Editar Equipo</p>
          </div>
          <div className="w-full h-[calc(100%-3rem)] flex flex-col items-center mt-[3rem]">
            <div className="mt-6 w-full flex justify-center">
              <TextField
                label="Nombre del equipo"
                sx={{ width: "90%" }}
                value={editDevice?.nombre || ""}
                onChange={(e) => {
                  setEditDevice({ ...editDevice, nombre: e.target.value });
                }}
              />
            </div>
            <div className="mt-4 w-full flex justify-center">
              <TextField
                label="Descripción del equipo"
                multiline
                rows={3}
                sx={{ width: "90%" }}
                value={editDevice?.descripcion || ""}
                onChange={(e) => {
                  setEditDevice({ ...editDevice, descripcion: e.target.value });
                }}
              ></TextField>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefEdit}
              style={{
                position: "absolute",
                top: "-9999px",
                left: "-9999px",
                opacity: "0",
                width: "1px",
                height: "1px",
                pointerEvents: "none",
              }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setEditDevice({ ...editDevice, file: e.target.files[0] });
                }
              }}
            />
            <div
              onClick={() => {
                if (fileInputRefEdit.current) {
                  fileInputRefEdit.current.click();
                }
              }}
              className="bg-[#F0E6F7] mt-3 w-[90%] h-[3rem] flex flex-row items-center justify-center border-dotted border-4 border-[#AFAFAF] rounded-md cursor-pointer"
            >
              <img src="/svgs/upload-purple.svg" alt="upload icon" width={40} />
              <span className="text-lg ml-4">Subir Imagen</span>
            </div>
            <div className="mt-6 flex justify-center items-center h-[8rem] min-h-[8rem] max-h-[8rem] w-[10rem] bg-white overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={
                  editDevice?.file
                    ? URL.createObjectURL(editDevice?.file)
                    : selectedEquipment?.urlImagen
                }
                alt="machine img"
                width={130}
              />
            </div>

            <div className="mt-0 w-[80%] flex flex-row justify-around">
              <Button
                label="Cancelar"
                onClick={() => {
                  console.log("Cancelar equipo...");
                }}
                classNames="cursor-pointer  bg-[#EDEDED] border-1 text-black w-[8rem] h-[2rem] shadow-md rounded-md text-bold text-xl"
              />
              <Button
                label="Confirmar"
                onClick={async () => {
                  if (!checkEntriesEdit(editDevice)) {
                    return;
                  }

                  await updateEquipment(editDevice);
                }}
                classNames="cursor-pointer hover:bg-add-green-hover bg-add-green w-[8rem] h-[2rem] shadow-md rounded-md text-bold text-white text-xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* panel de borrar equipo */}
      {activeModal && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black z-50 opacity-40"></div>

          <div className=" flex justify-center w-[30%] h-[30%] bg-white shadow-md rounded-md absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
            <p className="text-xl font-bold text-left w-[80%] top-[2rem] left-1/2 bottom-0 -translate-x-1/2 absolute ">
              ¿Desea usted eliminar el reactivo: {selectedEquipment?.nombre}?
            </p>
            <Button
              onClick={async () => {
                const res = await fetchDeleteDevice(selectedEquipment?._id);

                if (res.ok) {
                  toast.success("Equipo eliminado correctamente");
                  queryClient.invalidateQueries(["equipment"]);
                  setActiveModal(null);
                } else {
                  toast.error("Error al eliminar equipo");
                  throw new Error("Error al eliminar equipo");
                }
              }}
              classNames="!absolute cursor-pointer hover  :bg-[#CD1C1C] bg-[#D41D1D] w-[8rem] h-[2rem] left-1/2 -translate-x-1/2 bottom-8 shadow-md rounded-md text-bold text-white text-LG"
              label="Eliminar"
            ></Button>
            <span
              onClick={() => {
                setActiveModal(null);
              }}
              className="absolute right-4 top-4 font-bold text-2xl cursor-pointer"
            >
              X
            </span>
          </div>
        </>
      )}
    </div>
  );
};
//chino el pro estuvo aqui
export default Equipment;
