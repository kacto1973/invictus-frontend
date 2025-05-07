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

const Transactions = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    tipo: "",
    reactivo: "",
    marca: "",
    cantidad: "",
    descripcion: "",
  });

  const TAB_TYPE = {
    AGREGAR: "AGREGAR",
  };

  return (
    <div className="bg-[#EDEDED] w-screen h-screen relative m-0 overflow-hidden">
      <TemporaryDrawer></TemporaryDrawer>
      <Header label="Movimientos"></Header>
      {/*div padre de todo lo demas */}
      <div
        className={`relative ml-[250px] mt-[5rem] w-[calc(100vw-250px)] h-[calc(100vh-5rem)] bg-[#EDEDED] overflow-hidden flex `}
      >
        <div className="w-1/2 h-full flex flex-col p-5">
          <div className="w-full flex flex-row">
            <SearchBox classNames="w-[18rem] h-[3rem] mb-5 mr-5"></SearchBox>
            <TextField
              id="outlined-basic"
              label="Movimiento"
              variant="outlined"
              select
              sx={{
                width: "16rem",
                backgroundColor: "white",
              }}
            />

            <Button
              classNames="bg-[#6DBA43] text-white w-[10rem] h-[3rem] ml-5"
              label="Añadir"
              onClick={() => {
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
            ? "absolute rounded-md z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white w-[30%] h-[85%]"
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
          >
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="salida">Salida</MenuItem>
          </TextField>
          <TextField
            id="outlined-basic"
            label="Reactivo"
            variant="outlined"
            margin="normal"
            sx={{
              width: "75%",
              marginTop: "1rem",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Marca"
            variant="outlined"
            margin="normal"
            sx={{
              width: "75%",
              marginTop: "1rem",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Cantidad"
            variant="outlined"
            margin="normal"
            sx={{
              width: "75%",
              marginTop: "1rem",
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
          />
          <div className="w-full flex flex-row ">
            <Button
              onClick={() => {}}
              classNames="cursor-pointer hover:bg-[#3a2dcc] !absolute bottom-5 left-13 bg-[#4334eb] w-[10rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
              label="Cancelar"
            ></Button>
            <Button
              onClick={() => {}}
              classNames="cursor-pointer hover:bg-[#6DBA43] !absolute bottom-5 right-13 bg-[#79CB4C] w-[10rem] h-[3rem] shadow-md rounded-md text-bold text-white text-xl"
              label="Confirmar"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
