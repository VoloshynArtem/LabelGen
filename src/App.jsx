import { useState, createContext, useContext, useRef } from "react";
import { motion } from "framer-motion";

import Print from "./Print.jsx";
import "./App.css";
import "./List.css"
import "./Input.css";


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
        

        <div className="controlls">
          <SubmitButton />
          <PrintButton />

        </div>

        
        

      </LabelItems.Provider>


    </div>
  );
}



function SubmitButton(){
  return <button type="submit" form="form">Submit</button>
}


function Input() {
  const { items, setitems } = useContext(LabelItems);
  function handleSubmit(e) {
    e.preventDefault();
    

    const value = e.target.elements.form.value;

    console.log(value.length);

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

function PrintButton(){
  const {items} = useContext(LabelItems);
  
  function handleClick() {
    Print(items);
  }
  
  return(
    <div>
      <button onClick={handleClick}> print </button >
    </div>

  )
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
        {items.map(item => (
          <motion.button className="listButton" 
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
      </div>
}
export default App;


