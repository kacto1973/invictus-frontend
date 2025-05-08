import React from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import CustomizedTables from "../components/TransactionsTable";
import SearchBox from "../components/SearchBox";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  fetchInventory,
  fetchBrands,
  fetchAddTransaction,
} from "../services/fetchers.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transactions = () => {
  /*states */
  const [activeModal, setActiveModal] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    movimiento: "",
    idReactivo: "",
    idMarca: "",
    cantidad: "",
    descripcion: "",
  });
  const [filter, setFilter] = useState({
    tipo: "todo",
    search: "",
  });

  /* use effect */

  useEffect(() => {
    console.log("newTransaction", newTransaction);
  }, [newTransaction]);

  /*constants */

  const TAB_TYPE = {
    AGREGAR: "AGREGAR",
  };

  /*tanstack */

  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: fetchInventory,
  });

  const { data: marcas } = useQuery({
    queryKey: ["marcas"],
    queryFn: fetchBrands,
  });

  /* functions */

  const checkEntries = (newTransaction) => {
    if (!newTransaction?.movimiento) {
      toast.error("Selecciona un movimiento");
      return false;
    }
    if (!newTransaction?.idReactivo) {
      toast.error("Selecciona un reactivo");
      return false;
    }
    if (!newTransaction?.idMarca) {
      toast.error("Selecciona una marca");
      return false;
    }
    if (!newTransaction?.cantidad) {
      toast.error("Selecciona una cantidad");
      return false;
    }
    if (!newTransaction?.descripcion) {
      toast.error("Selecciona una descripcion");
      return false;
    }

    return true;
  };

  const addTransaction = async (transaction) => {
    const response = await fetchAddTransaction(transaction);
    if (response.ok) {
      toast.success("Movimientos agregada correctamente");
      setNewTransaction({
        movimiento: "",
        idReactivo: "",
        idMarca: "",
        cantidad: "",
        descripcion: "",
      });
      setActiveModal(null);
    } else {
      toast.error("Error al agregar movimiento");
      throw new Error("Error al agregar movimiento");
    }
  };

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Movimientos"></Header>
      <ToastContainer position="bottom-right" autoClose={2500} />

      {/*div padre de todo lo demas */}
      <div
        className={`relative ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
      >
        <div className="w-1/2 h-full flex flex-col p-5">
          <div className="w-full flex flex-row">
            <SearchBox
              value={filter?.search}
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
              classNames="w-[18rem] h-[3rem] mb-5 mr-5"
            ></SearchBox>
            <TextField
              id="outlined-basic"
              label="Movimiento"
              variant="outlined"
              select
              value={filter?.tipo}
              onChange={(e) => {
                setFilter({ ...filter, tipo: e.target.value });
              }}
              sx={{
                width: "16rem",
                backgroundColor: "white",
              }}
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="entrada">Entrada</MenuItem>
              <MenuItem value="salida">Salida</MenuItem>
            </TextField>

            <Button
              classNames="bg-[#6DBA43] text-white w-[10rem] h-[3rem] ml-5"
              label="Añadir"
              onClick={() => {
                console.log("click");
                setActiveModal(TAB_TYPE.AGREGAR);
              }}
            ></Button>
          </div>
          <div className="w-full overflow-y-auto">
            <CustomizedTables></CustomizedTables>
          </div>
        </div>
      </div>

      {/* pantalla opaca del fondo */}
      {activeModal !== null && (
        <div className="absolute top-0 left-0 w-full h-full bg-black z-50 opacity-40"></div>
      )}

      {/* panel para agregar  */}

      <div
        className={`${
          activeModal === TAB_TYPE.AGREGAR
            ? "absolute rounded-md z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white w-[30%] h-[88%]"
            : null
        }`}
      >
        <div className="absolute bg-[#E0C8F2] w-full h-[3rem] flex items-center rounded-t-md ">
          <p className="ml-5 *:">Agregar Movimiento</p>
        </div>
        <div className="flex flex-col items-center  w-full h-[100%-3rem] mt-[3rem]">
          <TextField
            id="outlined-basic"
            label="Tipo de movimiento"
            variant="outlined"
            margin="normal"
            select
            defaultValue="entrada"
            sx={{
              width: "75%",
              marginTop: "2rem",
            }}
            value={newTransaction?.movimiento}
            onChange={(e) => {
              setNewTransaction({
                ...newTransaction,
                movimiento: e.target.value,
              });
            }}
          >
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="salida">Salida</MenuItem>
          </TextField>
          <TextField
            id="outlined-basic"
            label="Reactivo"
            variant="outlined"
            margin="normal"
            select
            valaue={newTransaction?.idReactivo}
            onChange={(e) => {
              setNewTransaction({
                ...newTransaction,
                idReactivo: e.target.value,
              });
            }}
            sx={{
              width: "75%",
              marginTop: "1rem",
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
          >
            {data?.map((reactant) => {
              return (
                <MenuItem key={reactant?._id} value={reactant?._id}>
                  {reactant?.nombre}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Marca"
            variant="outlined"
            margin="normal"
            select
            sx={{
              width: "75%",
              marginTop: "1rem",
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              },
            }}
            value={newTransaction?.idMarca}
            onChange={(e) => {
              setNewTransaction({
                ...newTransaction,
                idMarca: e.target.value,
              });
            }}
          >
            {marcas?.map((marca) => {
              return (
                <MenuItem key={marca?._id} value={marca?._id}>
                  {marca?.nombre}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Cantidad"
            variant="outlined"
            margin="normal"
            sx={{
              width: "75%",
              marginTop: "1rem",
            }}
            value={newTransaction?.cantidad}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              setNewTransaction({
                ...newTransaction,
                cantidad: onlyNumbers,
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Descripción"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            sx={{
              width: "75%",
              marginTop: "1rem",
            }}
            value={newTransaction?.descripcion}
            onChange={(e) => {
              setNewTransaction({
                ...newTransaction,
                descripcion: e.target.value,
              });
            }}
          />
          <div className="w-[88%] flex flex-row justify-around mt-5 ">
            <Button
              onClick={() => {
                setActiveModal(null);
              }}
              classNames="cursor-pointer hover:bg-[#3a2dcc] bg-[#4334eb] w-[10rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
              label="Cancelar"
            ></Button>
            <Button
              onClick={async () => {
                console.log(newTransaction);

                if (!checkEntries(newTransaction)) {
                  return;
                }

                console.log("lanzando peticion al back, filtros pasados");
                await addTransaction(newTransaction);
              }}
              classNames="cursor-pointer hover:bg-[#6DBA43] bg-[#79CB4C] w-[10rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
              label="Confirmar"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
