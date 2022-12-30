import Footer from "../Footer/Footer"
import MainInfo from "../MainInfo/MainInfo"

import React, { useEffect } from 'react';
import { DifficultyContext, GuessContext, ImageContext, WordContext, HintsContext} from "../../Context"
import { useState } from "react"

function App() {

  const [guess, setGuess] = useState("")
  const [word, setWord] = useState("")
  const [image, setImage] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [hints, setHints] = useState([])

  useEffect(()=>{
    document.body.className = "bg-gray-700 w-screen h-screen"
  }, [])

  return (
    <div className="">
        <div className="w-3/4 m-auto h-screen flex justify-center items-center">
            <GuessContext.Provider value={{guess, setGuess}}>
              <ImageContext.Provider value={{image, setImage}}>
                <WordContext.Provider value={{word, setWord}}>
                  <DifficultyContext.Provider value={{difficulty, setDifficulty}}>
                    <HintsContext.Provider value={{hints, setHints}}>

                      <MainInfo/> 

                    </HintsContext.Provider>
                  </DifficultyContext.Provider>
                </WordContext.Provider>
              </ImageContext.Provider>
            </GuessContext.Provider>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
