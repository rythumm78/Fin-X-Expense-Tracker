import {useState} from "react";


export default function TextForm(props) {
const [text, setText] = useState("");



const handleupclick = () => {
console.log("Uppercase was clicked");
setText(text.toUpperCase());
props.showalert("Converted to Uppercase","success");
}


const handlelowclick = () => {
  setText(text.toLowerCase());
  props.showalert("Converted to Lowercase","success");
}


const handleclearclick = () => {
  setText("");
  props.showalert("Text Cleared","success");
}
const handlecopyclick = () => {
  navigator.clipboard.writeText(text);
  props.showalert("Text Copied to Clipboard","success");
}

return (
  <>
<div className="container mt-5" >



<div className="mt-5">
  <label htmlFor="exampleFormControlTextarea1" style={{fontSize: "30px"}} className={`form-label ${props.mode === "dark" ? "text-white" : "text-dark"}`}> Enter Expense Details... </label>
  <textarea  className={`form-control ${
    props.mode === "dark"
      ? "bg-dark text-white"
      : "bg-light text-dark"
  }`} value={text} id="exampleFormControlTextarea1" rows="4" onChange={(e) => setText(e.target.value)}></textarea>
</div>

<button className="btn btn-primary mt-3 me-3" disabled={text.length === 0} onClick={handleupclick}>Convert to Uppercase</button>
<button className="btn btn-primary mt-3 me-3" disabled={text.length === 0} onClick={handlelowclick}>Convert to Lowercase</button>
<button className="btn btn-primary mt-3 me-3" disabled={text.length === 0} onClick={handleclearclick}>Clear Text</button>
<button className="btn btn-primary mt-3 me-3" disabled={text.length === 0} onClick={handlecopyclick}>Copy Text</button>

</div>


<div className="container my-4">

  <h3 className={props.mode === "light" ? "text-dark" : "text-light"}>Text Summary</h3>
  <p className={props.mode === "light" ? "text-dark" : "text-light"}>{text.trim() === "" ? 0 : text.trim().split(/\s+/).length} words and {text.length} characters</p>
  <h3 className={props.mode === "light" ? "text-dark" : "text-light"}>Preview</h3>
  <p className={props.mode === "light" ? "text-dark" : "text-light"}>{text.length>0?text:"Preview will appear here"}</p>

</div>


</>


);
}