import React from 'react';
import Stats from "../Stats/Stats";
import Guess from "../Guess/Guess";
import { GuessesLeftContext, StreakContext } from '../../Context';
import { useState } from 'react';
import { GUESS_COUNT } from '../../Utils/Enums';

function GuessAndStats() {
    const [streak, setStreak] = useState(0);
    const [guessesLeft, setGuessesLeft] = useState(GUESS_COUNT);

    return (
      
      <div className="flex flex-col lg:flex-row p-4 w-full">
        <StreakContext.Provider value={{streak, setStreak}}>
          <GuessesLeftContext.Provider value={{guessesLeft, setGuessesLeft}}>

              <Guess/>
              <Stats/>

          </GuessesLeftContext.Provider>
        </StreakContext.Provider>
      </div>
    );
  }
  
  export default GuessAndStats;
  