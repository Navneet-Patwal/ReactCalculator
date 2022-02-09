
import React,{useState} from "react";

function App() {

    //states for updating ui 

const [result, setResult] = useState("");
const [scifiButton, setButton] = useState("");
const [isToggled, setToggle] =useState(false);
const [theme,setTheme] = useState(false);
const [buttonClass,setClass] = useState("button");
const [calcClass,setCalc] = useState("calculator");


//creating buttons
const operators = ["/","*","+","-"];
const display = [1,2,3,4,5,6,7,8,9,0,...operators];
const digitsButton =[];

for(let i = 0; i < display.length; i++){
    digitsButton.push(
    <button className={buttonClass} value={display[i]} key={i} onClick={displayValue}>{display[i].toString()}</button>
    );
}

//showing expression on Screen
function displayValue (event)
{
    setResult(prevValue => prevValue+(event.target.value).toString());
    
}

//calculating expression
function calculate() 
{
    const value = document.getElementsByClassName("screen")[0].innerText;
    for(let k =0; k < value.length; k++){
        let exp += eval(value[k-1]+value[k]+value[k+1]);
    }
    setResult(exp);
    return value;
}


//calculating squareroot
 function squareRoot() 
{
      Math.sign(calculate()) === -1? setResult("Error") :setResult(calculate()*calculate());
}


//sign of number
function sign()
{
    Math.sign(calculate()) === -1? setResult(Math.abs(calculate())) : setResult("-"+calculate().toString());    
}


//scientificMode
function scifiMode()
{

    isToggled ?  setButton("") :
    setButton(
    <div>
           <button className={buttonClass} onClick={()=>{setResult(calculate()*calculate());}}>square</button>
           <button className={buttonClass} onClick={squareRoot}>sq.Root</button>
           <button className={buttonClass} onClick={sign}>+/-</button>
    </div>) ;

    setToggle((rev) => !rev);
    }

//Changing theme between light and dark
function changeTheme(){
    if(theme){
      setClass("button dark");
      setCalc("calculator dark");

    }else {
        setClass("button");
        setCalc("calculator");
    }
    setTheme((prev)=> !prev);
}


return ( 
<div className={calcClass}>
<div className={buttonClass}>{result}</div>
    <div>{digitsButton}
        <button  className={buttonClass} onClick={()=> setResult("")}>clear</button>
        <button  className={buttonClass} onClick={calculate}>=</button>
        <button  className={buttonClass} onClick={scifiMode} >SciFI</button>
        <button  className={buttonClass} onClick={changeTheme}>theme</button>
        {scifiButton}
    </div>
</div>
);
}

export default App;