import { useContext } from 'react';
import { DifficultyContext, GuessesLeftContext, StreakContext } from '../../Context';
import useAPI from '../../Hooks/useAPI';
import { DIFFICULTY } from '../../Utils/Enums';

export const useStats = () => {
    const {guessesLeft} = useContext(GuessesLeftContext);
    const {streak} = useContext(StreakContext);
    const {difficulty, setDifficulty} = useContext(DifficultyContext)

    const { changeDifficulty } = useAPI();

    const nextDifficulty = e =>{
        e.stopPropagation();
        if(difficulty === DIFFICULTY.EASY)
            handleDifficultyChange(DIFFICULTY.MEDIUM)
        if(difficulty === DIFFICULTY.MEDIUM)
            handleDifficultyChange(DIFFICULTY.PRO)
        if(difficulty === DIFFICULTY.PRO)
            handleDifficultyChange(DIFFICULTY.EASY)

    }

    const getDifficultyColorStyle = () => {
        if(difficulty === DIFFICULTY.EASY)
          return {color: "rgba(5, 150, 105, 1)"}
        if(difficulty === DIFFICULTY.MEDIUM)
          return {color: "rgba(245, 158, 11, 1)"}
        if(difficulty === DIFFICULTY.PRO)
          return {color: "rgba(220, 38, 38, 1)"} 
        
          return {color: "black"} // default condition
      }
  
    const style = (diff) => {
        let scaleValue;
        let translateValue = "0";

        if(diff === DIFFICULTY.MEDIUM)
            translateValue = "-24px"
        if(diff === DIFFICULTY.PRO)
            translateValue = "-48px"

        if(difficulty === diff)
            scaleValue = 1
        else 
            scaleValue = 0
        
        return {
            transformOrigin: "left top",
            transition: "100ms",
            transform : `scaleY(${scaleValue}) translateY(${translateValue})`,
        }

    }

    const handleDifficultyChange = (difficultySetting) => {
        if(difficultySetting === difficulty)
            return 

        changeDifficulty(difficultySetting)
        setDifficulty(difficultySetting)
        
    } 

    return {
            guessesLeft,  
            streak,
            nextDifficulty, 
            style, 
            getDifficultyColorStyle
        }

}

export default useStats