import * as React from "react";
import { styled } from "@mui/material/styles";
import styledComponents from "styled-components";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSidebarContext } from "../../../contexts/sidebar_context";
import { NavCart, NavButtons } from "../elements";

const drawerWidth = 200;

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
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 200,
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
        <CartContainer>
          <NavCart />
        </CartContainer>
        <Divider />
        <NavButtons />
      </Drawer>
    </Box>
  );
}

const CartContainer = styledComponents.div`
display: flex;
align-items: center;
background: white;
overflow: hidden;

@media (orientation: landscape) and (min-height: 351px) and (max-height: 400px) {
  height: 30vh !important;
}

@media (orientation: landscape) and (min-height: 401px) and (max-height: 760px) {   
  height: 20vh !important;
}


@media (min-height: 100px) and (max-height: 350px) {
  height: 100px !important;
}
`;
