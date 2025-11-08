import { useState, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Print from "./Print.jsx";
import "./App.css";
import "./List.css"
import "./Input.css";

import Popup from 'reactjs-popup';


const LabelItems = createContext();

function App() {
   const [items, setitems] = useState([]);
  
  return (
    
    <div className="app">
      <LabelItems.Provider value={{ items, setitems }}>
        
        <div>
          <Input />
          <List />
        </div>
        
        <Controlls />
      
      </LabelItems.Provider>


    </div>
  );
}





function Input() {
  const { items, setitems } = useContext(LabelItems);
  function handleSubmit(e) {
    e.preventDefault();
    

    const value = e.target.elements.form.value;

    if(value.length >0){
      setitems(previtems => [
        {id: items.length,
        text: value},
        ...previtems
      ]);
      e.target.reset();
    
    }
  
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input name="form" type="text" />

      </form>
    </div>
  );
  
}

function Controlls(){
  const {items} = useContext(LabelItems);
  const dimensions = {width: useRef(),height: useRef()};
  
  function handleClick() {
    Print(items, dimensions["width"].current, dimensions["height"].current);
  }

  
  return(
    <div className="controlls">
      <button type="submit" form="form">Submit</button>
      
      <button onClick={handleClick}> print </button >
      <Popup trigger={<button className="button">Settings</button>} modal>
        {close => <Settings close={close} dimensions={dimensions} />}
      </Popup>

    </div>

  )
}



function Settings({close, dimensions}){
  function handleSetSize(e){
    e.preventDefault();
    dimensions[e.target.name].current = e.target.value
  }

  return (
    <div className="settings">
      <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
        <label>Width:</label>
        <input className="settingsInput" type="text" name="width" size="4" maxLength="4" />
      </form>

      <form className="settingsForm" onChange={handleSetSize} onSubmit={(e) => e.preventDefault()}>
        <label>Height:</label>
         <input className="settingsInput" type="text" name="height" size="4" maxLength="4" />
      </form>
      
      <button className="closeButton" onClick={close}>Close</button>
    </div>
  );

}


function List(){
  const wasDragged = useRef(false);
  const { items, setitems } = useContext(LabelItems);
  
  function deleteItem(id){
    if(!wasDragged.current){
      setitems(prevItems => prevItems.filter(item => item.id !== id));
    }
  }
  
    return <div className="list">
      <AnimatePresence initial={false}>
        {items.map(item => (
          <motion.button className="listButton" 
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            exit={{scaleX: 0}}

            key={item.id} 
            onClick={() => deleteItem(item.id)}
            onDragStart={() => (wasDragged.current = true)}
            onDragEnd={() => (wasDragged.current = false)}
            drag
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 1200, bounceDamping: 20 }}
          >
            {item.text}
          </motion.button>
        ))}

      </AnimatePresence>
      </div>
}

export default App;


