import React from 'react';
import { useContext } from "react";
import { ImageContext } from "../../Context";

function Image() {
  const { image } = useContext(ImageContext)

  return (
    <div style={{transform: "translateY(-50px)", border: "0.5px solid black"}} className="overflow-hidden flex justify-center items-center bg-gray-300 w-full h-full shadow-inner border-8 border-gray-200 border-solid">
      <img className="object-contain w-5/6 shadow-lg border-4 border-white border-solid" src={image} alt="guess"></img>
    </div>
  );
}

export default Image;
