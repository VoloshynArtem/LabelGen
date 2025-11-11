import React, { useContext, useRef } from 'react';
import LabelItemsContext from "./Context.jsx";

import Popup from 'reactjs-popup';
import Print from "./Print.jsx";


export default function Controlls(){
  const {items, setitems} = useContext(LabelItemsContext);

  const dimensions = {width: useRef(),height: useRef()};
  
  function handleClick() {
    Print(items, dimensions["width"].current, dimensions["height"].current);
  }

  
  return(
    <div className="controlls">
      <button type="submit" form="form">Submit</button>
      <Popup trigger={<button className="button">Settings</button>} modal>
        {close => <Settings close={close} dimensions={dimensions} />}
      </Popup>
      <button onClick={handleClick}> print </button >


    </div>

  )
}



function Settings({close, dimensions}){
  function handleSetSize(e){
    console.log(e);
    e.preventDefault();
    dimensions[e.target.name].current = e.target.value;
  }

  return (
    <div className="settings">
      <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
        <label>Width:</label>
        <input className="settingsInput input" type="number" defaultValue={dimensions["width"].current} name="width" min="0" max="9999" />
      </form>

      <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
        <label>Height:</label>
         <input className="settingsInput input" type="number" defaultValue={dimensions["height"].current} name="height" min="0" max="9999" />
      </form>
      
      <button className="closeButton" onClick={close}>Close</button>
    </div>
  );

}

