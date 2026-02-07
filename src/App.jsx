import { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Controlls from "./Controlls.jsx";
import LabelItemsContext from "./Context.jsx";
import "./App.css";
import "./List.css"
import "./Input.css";
import "./MediaQuerries.css";



function App() {
   const [items, setitems] = useState([]);
  
  return (
    
    <div className="app">
      <LabelItemsContext.Provider value={{ items, setitems }}>
      
        <Input />
        <Controlls />
        <List />
      </LabelItemsContext.Provider>


    </div>
  );
}


function Input() {
  const { items, setitems } = useContext(LabelItemsContext);
  const inputarea = useRef(null);
  const inputareaform = useRef(null);

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
      recalculateHeight();
    }
  }
  
  function handleKeyDown(e){
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
}


  function recalculateHeight(){
    const boxheight = (1 + inputarea.current.value.split('\n').length) + "lh";
    inputarea.current.style.height = boxheight;
    inputareaform.current.style.height = boxheight;

  }

  return (
    <form id="form" ref={inputareaform} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <textarea ref={inputarea} onChange={recalculateHeight} className="input" name="form" type="text" />
    </form>
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


