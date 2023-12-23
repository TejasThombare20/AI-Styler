import React from "react";
import CustomButton from "./CustomButton";

const AiPicker = ({ prompt, setprompt, generatingImg, handleSubmit }) => {
  return (
    <div className="absolute left-full ml-3 glassmorphism p-3 w-[195px] h-[220px] flex flex-col rounded-md">
      <textarea
        rows="5"
        placeholder="Ask AI ... "
        value={prompt}
        onChange={(e) => setprompt(e.target.value)}
        className="w-full bg-transparent border border-gray-300 text-sm p-2 outline-none flex-1"
      />
      <div className="flex flex-wrap gap-2 ">
        {
          generatingImg ? (
            <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"/>
          ) : (
            <>
            <CustomButton
            type="outline"
            title="AI Logo"
            handleClick={()=>handleSubmit('logo')}
            customStyles="text-xs"
            />
             
            <CustomButton
            type="filled"
            title="AI Full"
            handleClick={()=>handleSubmit('full')}
            customStyles="text-xs"
            />
            </>
          )
        }
      </div>
    </div>
  );
};

export default AiPicker;
