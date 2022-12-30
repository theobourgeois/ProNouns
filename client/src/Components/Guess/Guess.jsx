import React from 'react';

import useGuess from './useGuess.js';
function Guess() {
    const { currentInput, handleCurrentInput, handleEnterGuess, inputRef } = useGuess();

    return (
      <div className="flex flex-col mb-2 mr-0 lg:mr-8 w-full">
        <input style={{border: "0.5px solid black"}} ref={inputRef} value={currentInput} onKeyDown={handleEnterGuess} onChange={handleCurrentInput} className="rounded-sm transition ease-out delay-50 outline-none mb-2 p-1 text-gray-600" placeholder="Enter guess here:"></input>
        <button style={{border: "0.5px solid black"}} onClick={handleEnterGuess} className="bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700" >Enter</button>
      </div>
    );
  }
  
  export default Guess;
  