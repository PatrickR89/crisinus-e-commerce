import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { useSidebarContext } from "../contexts/sidebar_context";

const ListMenu = ({
  items,
  prevPage,
  nextPage,
  itemChange,
  itemCriteria,
  length,
  byId,
  sidebar
}) => {
  const { closeSidebarAR } = useSidebarContext();

  return (
    <div
      className={sidebar ? "menu-left" : "menu-left toggle-disp-1000"}
      style={sidebar && { width: "100%" }}
    >
      <ul>
        <li>
          <button
            className={length < 6 ? "btn select disable-display" : "btn select"}
            onClick={prevPage}
          >
            <FaChevronUp />
          </button>
        </li>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <button
                className={
                  byId
                    ? item.id === itemCriteria
                      ? "btn select current"
                      : " btn select"
                    : item === itemCriteria
                    ? "btn select current"
                    : " btn select"
                }
                disabled={
                  byId
                    ? item.id === itemCriteria
                      ? true
                      : false
                    : item === itemCriteria
                    ? true
                    : false
                }
                onClick={
                  byId
                    ? () => {
                        itemChange(item.id);
                        closeSidebarAR();
                      }
                    : () => {
                        itemChange(item);
                        closeSidebarAR();
                      }
                }
              >
                {byId ? item.title : item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            className={length < 6 ? "btn select disable-display" : "btn select"}
            onClick={nextPage}
          >
            <FaChevronDown />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListMenu;
