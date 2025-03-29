import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DrawerButton from "./DrawerButton";

{
  /*<ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            
          </ListItem> */
}

export default function TemporaryDrawer({ isOpen }) {
  const [open, setOpen] = React.useState(isOpen);

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
        backgroundColor: "#333333",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {/*<img
        src="svgs/arrow-left.svg"
        alt=""
        width={30}
        className="absolute right-2 top-2"
      /> */}
      <div className="w-full h-[10rem] mt-5 flex items-center justify-center">
        <img
          src="images/DICTUS-logo.png"
          width={120}
          alt="logo de departamento"
        />
      </div>
      <List className="w-full flex flex-col items-center ">
        {[
          { text: "Home", img: "/svgs/home.svg" },
          { text: "Inventario", img: "/svgs/box.svg" },
          { text: "Reportes", img: "/svgs/document.svg" },
          { text: "Configuración", img: "/svgs/gear.svg" },
        ].map((object) => (
          <DrawerButton
            buttonIcon={object.img}
            buttonText={object.text}
            classNames="justify-start"
          ></DrawerButton>
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
