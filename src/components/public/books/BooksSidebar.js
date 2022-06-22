import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSidebarContext } from "../../../contexts/sidebar_context";
import { FilterItems } from "./";

const drawerWidth = 320;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    backgroundColor: "hsl(45, 88%, 60%)"
}));

export default function PersistentDrawerRight() {
    const { closeSidebarBooks, isSidebarBooksOpen, ref_books } =
        useSidebarContext();

    return (
        <Box sx={{ display: "flex" }} ref={ref_books}>
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
                open={isSidebarBooksOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={closeSidebarBooks}>
                        <ChevronRightIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <FilterItems inSidebar={true} />
            </Drawer>
        </Box>
    );
}
