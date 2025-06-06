import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import SidebarBtn from "./SidebarBtn";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer({ isOpen }) {
  const [open, setOpen] = React.useState(isOpen);
  const navigator = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "#262625",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {}
      <div className="w-full h-[10rem] mt-5 flex items-center justify-center">
        <img
          src="images/DICTUS-logo.png"
          width={120}
          alt="logo de departamento"
        />
      </div>
      <List className="w-full flex flex-col items-center ">
        {[
          { text: "Menú Principal", img: "/svgs/home.svg", route: "" },
          { text: "Inventario", img: "/svgs/box.svg", route: "inventory" },
          {
            text: "Movimientos",
            img: "/svgs/arrows-white.svg",
            route: "transactions",
          },
          {
            text: "Equipo",
            img: "/svgs/lab-machine-white.svg",
            route: "equipment",
          },

          { text: "Reportes", img: "/svgs/document.svg", route: "reports" },
          {
            text: "Configuración",
            img: "/svgs/gear.svg",
            route: "settings",
          },
        ].map((object, id) => (
          <SidebarBtn
            key={id}
            buttonIcon={object.img}
            buttonText={object.text}
            classNames="justify-start cursor-pointer "
            onClick={() => {
              navigator("/" + object.route);
            }}
          ></SidebarBtn>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        variant="persistent"
        ModalProps={{ keepMounted: true }} // Mantiene el componente montado sin bloquear el fondo
        open={true}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
