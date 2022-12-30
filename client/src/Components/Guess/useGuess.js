import { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { GuessesLeftContext, HintsContext, StreakContext, WordContext } from '../../Context';
import useAPI from '../../Hooks/useAPI';
import { GUESS_COUNT } from '../../Utils/Enums';

export const useGuess = () => {
    const [currentInput, setCurrentInput] = useState("");
    const { word } = useContext(WordContext);
    const { streak, setStreak } = useContext(StreakContext);
    const { guessesLeft, setGuessesLeft } = useContext(GuessesLeftContext);
    const { hints } = useContext(HintsContext)
    
    const { generateImage } = useAPI();

    const inputRef = useRef(null)

    const handleCurrentInput = e => {
        const value = e.target.value;
        const currentCharIsSpace = value.charAt(value.length-1) === " "

        if(currentCharIsSpace) 
            return;
            
        setCurrentInput(value);
    }

    const handleEnterGuess = (e) => {
        if(e.key === "Enter" || e.type === "click"){
            handleGuess(currentInput);
            handleColorChangeOnGuess(currentInput)
            
        }
    }    

    const handleColorChangeOnGuess = (guess) => {
        if(inputRef.current.value === "")
            return

        const green = "rgba(5, 150, 105, 1)"
        const yellow = "rgba(245, 158, 11, 1)"
        const red = "rgba(220, 38, 38, 1)"
        const shadowCss = "inset 0 0 10px " 

        const guessIsCorrect = handleCorrectness(guess) === word;
        const guessIsHint = hints.includes(guess)

        if(guessIsCorrect)
            inputRef.current.style.boxShadow = shadowCss + green;
        else if(guessIsHint)
            inputRef.current.style.boxShadow = shadowCss + yellow;
        else
            inputRef.current.style.boxShadow = shadowCss + red;

        setTimeout(()=>{
            inputRef.current.style.boxShadow = "none";
        }, 500)
    }

    /**
     * handles guess logic 
     * @param {string} guess - current input after enter button pressed
     */
    const handleGuess = (guess) => {
        // if input is empty
        if(guess === "" || guessesLeft === 0) 
            return

        const guessIsCorrect = handleCorrectness(guess) === word;
        setCurrentInput("") // set input back to empty

        if(guessIsCorrect) {
            generateImage(); // generate new image
            setStreak(streak + 1); //increment streak
            setGuessesLeft(GUESS_COUNT);// set guesses left back to default count 
            return;
        }

        // if guess is not correct and runs out of guess
        if(guessesLeft === 1){
            setGuessesLeft(0)

            // delay for 2 seconds to give time for word to flash on screen
            setTimeout(()=>{
                generateImage(); // generate new image
                setStreak(0); //reset streak
                setGuessesLeft(GUESS_COUNT); // set guesses left back to default count
                return;
            }, 2000)

        }
        
        // if guess is not correct
        setGuessesLeft(guessesLeft - 1); //decrement guesses left


    }

    /**
     * Handles guesses that are the word but end with 's' or,
     * the guess is the word without 's'
     * Examples:
     * * guess = "animals", word = "animal" 
     * * guess = "animals", word = "animal"
     * @param {string} guess - current input after enter button pressed
     * @returns word if is off by one guess and original guess otherwise
     */
    const handleOffByOneGuesses = (guess) => {
        const guessInWord = word.includes(guess);
        const wordInGuess = guess.includes(word);

        if(!guessInWord && !wordInGuess) 
            return guess;

        if(word.length === guess.length - 1)
            return word;

        const lastLetter = word.charAt(word.length-1)
        console.log(lastLetter)
        if(word.length === guess.length + 1 && lastLetter === "s")
            return word;


        return guess

    }

    const handleCorrectness = (guess) => {
        let finalGuess = handleOffByOneGuesses(guess);
        return finalGuess;
    }

    /**
     * generate image when page first loads
     */
    useEffect(()=>{
        generateImage();
    }, [])

    
    return { currentInput, handleCurrentInput, handleEnterGuess, inputRef }
}

export default useGuess