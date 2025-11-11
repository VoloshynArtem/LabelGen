import { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Controlls from "./Controlls.jsx";
import LabelItemsContext from "./Context.jsx";
import "./App.css";
import "./List.css"
import "./Input.css";

import TextareaAutosize from 'react-textarea-autosize';


function App() {
   const [items, setitems] = useState([]);
  
  return (
    
    <div className="app">
      <LabelItemsContext.Provider value={{ items, setitems }}>
        
        <div>
          <Input />
          <List />
        </div>
        
        <Controlls />
      
      </LabelItemsContext.Provider>


    </div>
  );
}


function Input() {
  const { items, setitems } = useContext(LabelItemsContext);
  
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
  
  function handleKeyDown(e){
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
}


  return (
    <div>
      <form id="form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <TextareaAutosize className="input" name="form" type="text"></TextareaAutosize>
      </form>
    </div>
  );
  
}


function List(){
  const wasDragged = useRef(false);
  const { items, setitems } = useContext(LabelItemsContext);
  
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


