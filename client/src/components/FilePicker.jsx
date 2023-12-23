import React from "react";
import CustomButton from "./CustomButton";

const FilePicker = ({ file, setfile, readFile }) => {
  return (
    <div className="absolute left-full flex flex-col justify-center items-center ml-3 glassmorphism p-3 w-[195px] h-[220px] rounded-md">
      <div className="flex-1 flex flex-col  ">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <label
          htmlFor="file-upload"
          className=" border border-gray-300 text-gray-700 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-fit rounded-md shadow-sm text-xs"
        >
          upload File
        </label>
        <p className="mt-2 text-white text-xs truncate  ">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 ">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />
              
        <CustomButton 
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
