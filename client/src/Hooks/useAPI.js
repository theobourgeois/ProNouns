import axios from "axios"
import { useContext } from "react"
import { DifficultyContext, HintsContext, ImageContext, WordContext } from "../Context"

const API_URL = "https://pro-nouns.herokuapp.com/"


export const useAPI = () => {
  const { setWord } = useContext(WordContext);
  const { setImage } = useContext(ImageContext);
  const {setDifficulty} = useContext(DifficultyContext)
  const {setHints} = useContext(HintsContext)
  /*
    Generates image from google image search using random 
    fetches image and corresponding word then sets current word and image to response
  */
  
  const generateImage = () => {
    axios.get(API_URL, {setWord: setWord})
      .then(res => {
        const word = res.data.word
        const img = res.data.img
        const difficulty = res.data.difficulty
        const hints = res.data.hints

        
        if(!word || !img){
            console.log("word:", word, ", img:", img)
            return
        }
        console.log("WORD: ", word)

        setWord(word)
        setImage(img)
        setHints(hints)
        setDifficulty(difficulty)

      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const changeDifficulty = (difficulty) => {
    
    axios.post(API_URL, {difficulty: difficulty})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  

  return { generateImage, changeDifficulty }

}

export default useAPI