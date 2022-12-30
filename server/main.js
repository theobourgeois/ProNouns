const express = require('express')
const fs = require('fs/promises');
const GoogleImages = require('google-images');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const GOOGLE_API_KEY = 'AIzaSyBPt61qznQCX7KZNpScJzEhzeaw-zvTMyw'
const SE_ID = '73a88720340b840eb'

const client = new GoogleImages(SE_ID, GOOGLE_API_KEY);
const app = express()
const sleep = require('util').promisify(setTimeout)

app.use(cors())
app.use(bodyParser.json());
const server = http.createServer(app);

const PORT = process.env.PORT || 8000; app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });

let difficulty = "easy"
let cacheFileContents = {
    difficulty: difficulty,
    words: undefined
};


const apiSchema = {
    word: "",
    img: "",
    difficulty: difficulty, 
    hints: []
}

let seenWords = []

// gets api schema
app.get('/', async (req, res) => {
    await updateSchema();
    res.send(apiSchema)

})

app.post('/', async (req, res) => {
    if(!req.body.difficulty)
        return

    difficulty = req.body.difficulty
})


async function updateSchema(){
    let words = await getWords(difficulty + ".json")
    const randIndex = randNum(words.length)
    const wordInfo = words[randIndex]

    const word = wordInfo.word
    let img =  wordInfo.img
    if(seenWords.includes(word)) {
        console.log("WWWW")
        img = await getImageFromSearch(word)
        while(img == wordInfo.img)
            img = await getImageFromSearch(word)
            
    }

    
    const hints = wordInfo.hints

    apiSchema.word = word
    apiSchema.img = img
    apiSchema.difficulty = difficulty
    apiSchema.hints = hints

    seenWords.push(word)


    console.log("word: " + word + "\nimg: " + img + "\n")

}


async function getFileContents(filename){
    try {
        const data = await fs.readFile(filename, { encoding: 'utf8' });
        return data;
      } catch (e) {
        console.error(e);
      }
}

async function getImageFromSearch(search){
    try{

        const images = await client.search(search);
        let randIndex = randNum(images.length)

        let count = 0;
        while(images[randIndex].height >= images[randIndex].width) {
            count++
            if(count >= images.length)
                break
            randIndex = randNum(images.length)

        }
        
        
        return images[randIndex].url;
    }
    catch(e){
        console.error(e)
    }



}



/**
 * gets
 * @param {string} filename : the name of the file
 * @returns word info in
 */
const getWords = async (filename) => {
    if(cacheFileContents.difficulty == difficulty && cacheFileContents.words)
        return cacheFileContents.words
    
    let words = await getFileContents(filename)
    words = JSON.parse(words)

    cacheFileContents.difficulty = difficulty;
    cacheFileContents.words = words;
    return words;
    
}

/**
 * Given a file with a google search on every line, and a output file, generate image urls for each line.
 * formatted in json with objects "word", "img" and "hints"
 * @param {string} filename : the name of the file that contains words
 * @param {string} newfilename : the name of the output file
 */
const genImgs = async (filename, newfilename) => {
    let result = "[\n"
    const wordFile = await getFileContents(filename) 
    const words = wordFile.split("\n")
    for(let i = 0; i < words.length-1; i++) {
        const word = words[i]
        const url = await getImageFromSearch(word)
        // result += `${word}$ ${url} \n`
        result += `{\n\t"word": "${word}",\n\t"img": "${url}",\n\t"hints": []\n},\n`
        console.log("word: "+ word)
        await sleep(100) // as to not send too many requests
    }
    result += "]"
    fs.writeFile(newfilename, result, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

//genImgs("hardwords.txt", "hard.json")

/**
 * @param {number} max : the maximum number in range of 0 to infinity
 * @returns random number from 0 to max
 */
function randNum(max) {
    return Math.floor(Math.random() * max)
}


server.listen(PORT);


