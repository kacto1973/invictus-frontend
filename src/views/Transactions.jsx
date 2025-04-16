import React from "react";
import TemporaryDrawer from "../components/TemporaryDrawer";
import Header from "../components/Header";
import CustomizedTables from "../components/TransactionsTable";
import SearchBox from "../components/SearchBox";
import Button from "../components/Button";
import TextField from "@mui/material/TextField";

const Transactions = () => {
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
            <SearchBox classNames="w-[25rem] h-[3rem] mb-5 mr-5"></SearchBox>
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
              icon="svgs/plus-sign.svg"
              onClick={() => {}}
            ></Button>
          </div>
          <div className="w-full overflow-y-auto">
            <CustomizedTables></CustomizedTables>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
