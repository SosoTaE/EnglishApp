import '../dist/output.css';
import db from "../firebase"
import { query, where, collection, getDocs } from "firebase/firestore";  
import { useState, useRef } from 'react';

function Dictionary() {
  const [language,setLanguage] = useState("en")
  const placeholderText = {
    "en": "Type a word",
    "ge": "დაწერე სიტყვა"
  }

  const buttonText = {
    "en": "Search",
    "ge": "მოძებნა"
  }

  const type = {
    "en": "en_word",
    "ge": "ge_word"
  }



  const [data, setData] = useState([])

  const inputRef = useRef(null)


  const getWord = async () => {
    if (inputRef.current.value.trim() === "") {
      return
    }

    let array = []
    const words = collection(db,"words")
    const q = query(words, where(type[language], "==", inputRef.current.value.toLowerCase()));
    const querySnapshot = await getDocs(q); 
      querySnapshot.forEach((doc) => {
        array.push(doc.data())
    }); 
  
    setData(array)
  
    // await fetch(`http://localhost:8080/api/search? ${type[language]}=${inputRef.current.value.toLowerCase()}`)
    // .then(data => data.json())
    // .then(data => {
    //   if (data.array == null) {
    //     return
    //   }

    //   setData(data.array)
    // })
  }

  return (
   <div className="w-full h-[100vh] flex flex-col items-center">
      <div className="flex flex-row w-[240px] justify-between mt-4">
        <div className="w-24 h-[50px]  flex justify-center items-center rounded-xl  cursor-pointer" style={language === "en" ? {backgroundColor:"#c3c7da"}: {backgroundColor:"#e2e2e2"}} onClick={() => {setLanguage("en")}}>English</div>
        <div className="w-24 h-[50px] flex justify-center items-center rounded-xl  cursor-pointer" style={language === "ge" ? {backgroundColor:"#c3c7da"}: {backgroundColor:"#e2e2e2"}} onClick={() => {setLanguage("ge")}} >Georgian</div>
      </div>
      <div className="flex flex-col items-center max-w-[700px] w-[90%] mt-4 h-fit">
        <div className="w-full">
          <input type="text" ref={inputRef} placeholder={placeholderText[language]} className="outline-none bg-slate-200 rounded-md w-[100%] h-[35px] p-[10px] m-0"></input>
        </div>
        <div className="w-[100%] h-auto max-h-[70vh] mt-4 overflow-y-scroll hideScroll rounded-sm ease-in-out g-2 delay-500">
          {
            data.map((obj,index) => {
              return(
                <div className="w-[100%] h-12 p-2" key={index}>
                  <p>{language === "en" ? `${obj["en_word"]}: ${obj["ge_word"]}`: `${obj["ge_word"]}: ${obj["en_word"]}`}</p>
                </div>
              )
            })
          }
        </div>
       <div className="w-[100%] flex justify-end m-1">
          <div className="w-24 h-10 bg-slate-300 flex justify-center items-center rounded-lg cursor-pointer" onClick={() => getWord()}>{buttonText[language]}</div>
       </div>
      </div>
    </div>
  );
}

export default Dictionary;
