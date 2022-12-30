import { createContext } from "react";

//App.jsx
export const GuessContext = createContext()
export const ImageContext = createContext()
export const WordContext = createContext()
export const DifficultyContext = createContext()
export const HintsContext = createContext()

//GuessAndStats.jsx
export const GuessesLeftContext = createContext()
export const StreakContext = createContext()



export default { GuessContext, ImageContext, WordContext, GuessesLeftContext, StreakContext }