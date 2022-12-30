import React from 'react';
import { DIFFICULTY } from '../../Utils/Enums';
import useStats from './useStats';


function Stats() {
    const { guessesLeft, 
            streak, 
            nextDifficulty, 
            style, 
            getDifficultyColorStyle
    } = useStats();

    return (
      <div className="flex text-gray-600 select-none ">
        <div>
            <div className="flex">
              <h3 className="font-bold">Guesses left:  </h3>
              <h3>{guessesLeft}</h3>
            </div>
            <div className="flex">
              <h3 className="font-bold">Streak:  </h3>
              <h3>{streak}</h3>
            </div>

          <div className="flex cursor-pointer">
            <h3 className="font-bold">Difficulty:</h3>
            <div className="flex">
              <h3 className="ml-2" style={getDifficultyColorStyle()} onClick={nextDifficulty}>▼</h3>
              <div>
                <h3 style={style(DIFFICULTY.EASY)} className="text-green-600 hover:brightness-80 brightness-0 font-bold px-2" onClick={nextDifficulty}>Easy</h3>
                <h3 style={style(DIFFICULTY.MEDIUM)} className="text-yellow-600 hover:brightness-80 brightness-0 font-bold px-2" onClick={nextDifficulty}>Medium</h3>
                <h3 style={style(DIFFICULTY.PRO)} className="text-red-600 hover:brightness-80 brightness-0 font-bold px-2" onClick={nextDifficulty}>Pro</h3>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mx-auto w-full mu-auto">
          <h3 className="dark:bg-gray-800 dark:text-gray-300 bg-gray-300 text-center py-6 text-gray-500 shadow-inner rounded-md transition delay-500" style={wordRevealStyle}>Guess Was: {word} </h3>
        </div> */}

      </div>
    );
  }
  
  export default Stats;
  