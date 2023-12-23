import React from "react";
import { snapshot, useSnapshot } from "valtio";
import state from "../store";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);
  const activeStyle =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };
  return (
    <div
      key={tab.name}
      className={`w-14 h-14 flex justify-center items-center cursor-pointer select-none ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded"
      }`}
      onClick={handleClick}
      style={activeStyle}
    >
      <img src={tab.icon} alt="tab icon" 
      className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}/>
    </div>
  );
};
 
export default Tab;
