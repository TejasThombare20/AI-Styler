import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setfile] = useState("");
  const [prompt, setprompt] = useState("");
  const [generatingImg, setgeneratingImg] = useState(false);
  const [activeEditorTab, setactiveEditorTab] = useState("");
  const [activeFileterTab, setactiveFileterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;

      case "filepicker":
        return <FilePicker file={file} setfile={setfile} readFile={readFile} />;

      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setprompt={setprompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    console.log("prompt",prompt)
    if (!prompt) return alert("Please enter a prompt");

    try {
      setgeneratingImg(true);

      const respose = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });  

      const data = await respose.json()
      console.log("data",data)
     
      handleDecals(type , `data : image/png;base64,${data.photo}`)

      // generate image
    } catch (error) {
      alert(error);
    } finally {
      setgeneratingImg(false);
      setactiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {

    console.log("type",type)
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
     
    console.log("hello saka")

    if (!activeFileterTab[decalType.FilterTab]) {
      handleActiveFileterTab(decalType.FilterTab);
    }
  };

  const handleActiveFileterTab = (tabname) => {
    switch (tabname) {
      case "logoShirt":
        state.isLogoTexture = !activeFileterTab[tabname];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFileterTab[tabname];
        break;
      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
        break;
    }

    setactiveFileterTab((prevState) => {
      return {
        ...prevState,
        [tabname]: !prevState[tabname],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setactiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="glassmorphism  w-16 border-[2px] rounded-lg flex flex-col justify-center items-center ml-1 py-4 gap-4  ">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setactiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.intro = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            {...slideAnimation("up")}
            className="absolute z-10 bottom-0 right-0 left-0 w-full flex justify-center items-center flex-wrap gap-4"
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFileterTab[tab.name]}
                handleClick={() => handleActiveFileterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
