import React, { useContext, useRef, useEffect } from 'react';
import LabelItemsContext from "./Context.jsx";

import Popup from 'reactjs-popup';
import Print from "./Print.jsx";
import { Tooltip } from 'react-tooltip';
import "./Controlls.css";


export default function Controlls(){
  const {items, setitems} = useContext(LabelItemsContext);

  const printParameters = {
    width: useRef(localStorage.getItem("width")),
    height: useRef(localStorage.getItem("height")), 
    border: useRef(localStorage.getItem("border")? localStorage.getItem("border"): "solid"), 
    margin: useRef(localStorage.getItem("margin")? localStorage.getItem("margin"): "4")
  };

  function handleClick() {
    Print(items, printParameters);
  }


  return(
    <div className="controlls">
      <button type="submit" form="form">Submit</button>
      <Popup trigger={<button className="button">Settings</button>} modal>
        {close => <Settings close={close} printParameters={printParameters} />}
      </Popup>
      <button onClick={handleClick}> print </button >


    </div>

  )
}



function Settings({close, printParameters}){
  function handleSetSize(e){
    e.preventDefault();
    printParameters[e.target.name].current = e.target.value;
    localStorage.setItem(e.target.name, e.target.value);
  }

  return (
    <div className="settings">
      <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
        <label className= "settingsLabel" data-tooltip-id="tooltip" data-tooltip-content="sets the maximum width of each label in mm" >Width:</label>
        <input className="input settingsInput" type="number" defaultValue={printParameters.width.current} name="width" min="0" max="9999" autoComplete="off" />
      </form>

    <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
      <label className= "settingsLabel" data-tooltip-id="tooltip" data-tooltip-content="sets the maximum height of each label in mm" >Height:</label>
        <input className="input settingsInput" type="number" defaultValue={printParameters.height.current} name="height" min="0" max="9999" autoComplete="off" />
    </form>
   
    <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
      <label className= "settingsLabel" data-tooltip-id="tooltip" data-tooltip-content="sets page border for, so printer doesnt cut of the edges" >Page margin:</label>
        <input className="input settingsInput" type="number" defaultValue={printParameters.margin.current} name="margin" min="0" max="9999" autoComplete="off" />
    </form>
      

    <form className="settingsForm" onChange={handleSetSize}>
      <label className= "settingsLabel" data-tooltip-id="tooltip" data-tooltip-html="sets outline of each label <br>(spacing for non continous lines is broken)" >border style:</label>
      <select className="input settingsInput" defaultValue={printParameters.border.current} name="border">  
        <option value="solid">Solid</option>
        <option value="none">None</option>
        <option value="dotted">Dotted</option>
        <option value="dashed">Dashed</option>
        <option value="double">Double</option>
        <option value="groove">Groove</option>
        <option value="ridge">Ridge</option>
        <option value="inset">Inset</option>
        <option value="outset">Outset</option>
      </select>
    </form>

      <button className="closeButton" onClick={close}>Close</button>
      <Tooltip border="1px solid #646cff" id="tooltip"/>
    </div>
  );

}

