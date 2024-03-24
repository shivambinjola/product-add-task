import Image from "next/image";
import React from "react";

const Model = ({ comp, property }: any) => {
  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-opacity-90 bg-[#000000]/60 z-50 overflow-hidden ${property}`}
    >
      {comp}
    </div>
  );
};

export default Model;
