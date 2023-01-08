const fs = require('fs')
var words = require('./words.json')
var result=[]
result["Synonyms"]=0; result["Related"]=0; result["Near Antonyms"]=0; result["Antonyms"]=0; 
//read file
function getWords(filename, data){
    let p=new Promise((resolve,reject)=>{
        fs.readFile(filename,data,(error,data)=>{
            if(data){
                resolve(data)
            }else{
                reject(error)
            }
        })

    })
    return p
}
let x=getWords("Optimism_and_your_health.txt", "utf8")

x.then((text)=>{
    //standardize all characters and remove all special characters
    text=text.toLowerCase()
    text=text.replace(/\W/g, ' ')
    stringArray = text.split(" ")
    //count number of each word in the text
    const wFreq = function(a){
        return a.reduce((count,w)=>{
            count[w] = (count[w]||0)+1
            return count
        },{})
    }
    //add the amount of times the words we are looking for appear
    let countedArray = wFreq(stringArray)
    for(let j in countedArray){
        for(let i in words){
            for(let k in words[i]){
                if(j.includes(words[i][k])){
                    result[i]+=countedArray[j]     
                }
            }
        }
    }
    //create temporary object to prinnt results
    const temp = {
        Synonyms: result["Synonyms"] ,
        Related: result["Related"],
        ['Near Antonyms']: result['Near Antonyms'],
        Antonyms: result["Antonyms"]
    }
    fs.writeFile('result.txt',JSON.stringify(temp),() => {})
})
            .catch((error)=>{console.log(error)})
