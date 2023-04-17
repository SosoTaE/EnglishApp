import '../dist/output.css';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc  } from "firebase/firestore";
import db from "../firebase"
import { useState } from 'react';

function Addwords() {
    const [geinputValue, setgeInputValue] = useState("");
    const [eninputValue, setenInputValue] = useState("");
    const [response, setResponse] = useState("");
    const gehandleChange = (event) => {
        const { value } = event.target;
        if (/^[ა-ჰ]*$/g.test(value)) {
            setgeInputValue(value);
        }
    };

    const enhandleChange = function (event) {
      const { value } = event.target;
      if (/^[A-Za-z]*$/g.test(value)) {
        setenInputValue(value);
      }
    }

    const addWord = async () => {
        if (eninputValue.trim() === "" || geinputValue.trim() === "") {
            return;
        }

        const words = collection(db,"words")
        const q = query(words, where("en_word", "==", eninputValue.toLowerCase(),"ge_word", "==", geinputValue.toLowerCase()));
        const querySnapshot = await getDocs(q); 
        if (!querySnapshot.empty) { 
          setResponse("The words have already added")
          return;
        }
  
        const docRef = await addDoc(collection(db, "words"), {
            en_word: eninputValue.toLowerCase(),
            ge_word: geinputValue.toLowerCase()
        });

        if (docRef.id) {
          setResponse("The words is added")
        }

    }

    const deleteWord = async () => {
      if (eninputValue.trim() === "" || geinputValue.trim() === "") {
        return;
      }

      const words = collection(db,"words")
      const q = query(words, where("en_word", "==", eninputValue.toLowerCase(),"ge_word", "==", geinputValue.toLowerCase()));
      const querySnapshot = await getDocs(q); 
      if (querySnapshot.empty) { 
        setResponse("The words have not found")
        return;
      }

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "words", document.id));
      }); 


      setResponse("The words is deleted")

    }

    return(
        <div className="w-full h-[100vh] flex flex-col items-center">
        <div className="flex flex-col items-center max-w-[700px] w-[90%] mt-4 h-fit">
          <div className="w-full">
            <input type="text" value={geinputValue} onChange={gehandleChange} placeholder="დაწერეთ ქართული სიტყვა" className="outline-none bg-slate-200 rounded-md w-[100%] h-[35px] p-[10px] m-0"></input>
          </div>
          <div className="w-full m-3">
            <input type="text" value={eninputValue} onChange={enhandleChange} placeholder="Type a english word" className="outline-none bg-slate-200 rounded-md w-[100%] h-[35px] p-[10px] m-0"></input>
          </div>
          
         <div className="w-[100%] flex justify-end m-1">
            <div className="w-24 h-10 bg-slate-300 flex relative right-2 justify-center items-center rounded-lg cursor-pointer" onClick={() => deleteWord()}>Delete </div>
            <div className="w-24 h-10 bg-slate-300 flex justify-center items-center rounded-lg cursor-pointer" onClick={() => addWord()}>Add</div>
         </div>
          <div className="w-[100%] flex justify-start m-1">
          <p>{response}</p>
          </div>
        </div>
        
      </div>
    )
}

export default Addwords