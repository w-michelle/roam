"use client";

import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <MoonLoader size={50} color="black" />
    </div>
  );
};

export default Loader;
