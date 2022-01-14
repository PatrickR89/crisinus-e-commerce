import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useSidebarContext } from "../contexts/sidebar_context";
import { useAuthorsContext } from "../contexts/authors_context";
import { useReviewsContext } from "../contexts/reviews_context";
import { useItemsContext } from "../contexts/items_context";

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
  title,
  ver,
  mLength,
  handleChange,
  newId
}) {
  const { closeSidebarAR, isSidebarAROpen, ref_ar } = useSidebarContext();

  const {
    authorsList: authorArray,
    authorName,
    authorChange
  } = useAuthorsContext();
  const { news, newsID, changeNews } = useItemsContext();

  const { switchBook, currentBook, bookList } = useReviewsContext();

  return (
    <Box sx={{ display: "flex" }} ref={ref_ar}>
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
        {ver === "authors" && (
          <ListMenu
            items={items}
            prevPage={prevPage}
            nextPage={nextPage}
            itemChange={authorChange}
            itemCriteria={authorName}
            length={authorArray.length}
            sidebar={true}
          />
        )}
        {ver === "reviews" && (
          <ListMenu
            items={items}
            prevPage={prevPage}
            nextPage={nextPage}
            itemChange={switchBook}
            itemCriteria={currentBook}
            length={bookList.length}
            byId={true}
            sidebar={true}
          />
        )}
        {ver === "news" && (
          <ListMenu
            items={items}
            prevPage={prevPage}
            nextPage={nextPage}
            itemChange={changeNews}
            itemCriteria={newsID}
            length={news.length}
            byId={true}
            sidebar={true}
          />
        )}
      </Drawer>
    </Box>
  );
}
