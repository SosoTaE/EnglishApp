import "./dist/output.css"
import { Link } from "react-router-dom";

function App() {
    return(
        <div className="flex flex-col justify-center items-center h-[100vh] gap-2">
            <Link to="/dictionary"><div className="w-[70vw] max-w-[350px] h-[60px] bg-slate-200 flex justify-center items-center text-xl rounded-xl cursor-pointer">Dictionary</div></Link>
            <Link to="/addwords"><div className="w-[70vw] max-w-[350px] h-[60px] bg-slate-200 flex justify-center items-center text-xl rounded-xl cursor-pointer">Add words
            </div></Link>
        </div>
    )
}


export default App;