import React from 'react';
import GuessAndStats from "../GuessAndStats/GuessAndStats";
import Image from "../Image/Image";

function MainInfo() {

    return (
      <div style={{border: "0.5px solid black"}} className="flex flex-col mx-auto h-full sm:w-4/5 md:w-3/5 w-6/6 bg-gray-200 px-12">
          <div className="flex flex-col text-center pt-2 mb-8">
            <div className="flex mx-auto text-5xl">
              <h1 className="text-gray-700">Pro  </h1>
              <h1 className= "text-gray-500">Nouns</h1>
            </div>
            <h3 className="text-1xl text-gray-600">Guess what word the image is.</h3>
          </div>
          <GuessAndStats/>
          <Image/>
      </div>
    );
  }
  
  export default MainInfo;
  