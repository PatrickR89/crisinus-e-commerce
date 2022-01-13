import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useSidebarContext } from "../contexts/sidebar_context";
import { useAuthorsContext } from "../contexts/authors_context";
import { ListMenu } from "../components";

const drawerWidth = 320;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  backgroundColor: "hsl(45, 88%, 85%)"
}));

export default function PersistentDrawerRight({
  items,
  prevPage,
  nextPage,
  title
}) {
  const { closeSidebarAR, isSidebarAROpen, ref } = useSidebarContext();

  const {
    authorsList: authorArray,
    authorName,
    authorChange
  } = useAuthorsContext();

  return (
    <Box sx={{ display: "flex" }} ref={ref}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "hsl(45, 88%, 85%)"
          }
        }}
        variant="persistent"
        anchor="right"
        open={isSidebarAROpen}
      >
        <DrawerHeader>
          <IconButton onClick={closeSidebarAR}>
            <ChevronRightIcon />
            <h2 style={{ fontSize: "1.75rem", textTransform: "upperCase" }}>
              {title}
            </h2>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ListMenu
          items={items}
          prevPage={prevPage}
          nextPage={nextPage}
          itemChange={authorChange}
          itemCriteria={authorName}
          length={authorArray.length}
          sidebar={true}
        />
      </Drawer>
    </Box>
  );
}
