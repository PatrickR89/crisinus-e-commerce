import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSidebarContext } from "../../../contexts/sidebar_context";
import { NavCart, NavButtons } from "../elements";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  backgroundColor: "hsl(45, 88%, 60%)"
}));

export default function PersistentDrawerRight() {
  const { closeSidebarNav, isSidebarNavOpen, ref_nav } = useSidebarContext();

  return (
    <Box sx={{ display: "flex" }} ref={ref_nav}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "hsl(45, 88%, 60%)"
          }
        }}
        variant="persistent"
        anchor="right"
        open={isSidebarNavOpen}
      >
        <DrawerHeader>
          <IconButton onClick={closeSidebarNav}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div
          style={{
            backgroundColor: "white"
          }}
        >
          <NavCart />
        </div>
        <Divider />
        <NavButtons />
      </Drawer>
    </Box>
  );
}
