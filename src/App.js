import React, { useState } from 'react';
import './App.css';

console.log("Booting up what to do...");

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [list, setList] =  useState([]);
  const [isDeleted, setDeleted] = useState(false);
  const [inHover, setHover] = useState(false);


  function onAddItem (ev) {
    console.log('This button works');
    ev.preventDefault();
    setList([...list, { toDoItem: toDoItem, itemDescription: itemDescription}
      ]);
    console.log('Item added!');
    }
      
  function onToDoItemChange (ev) {
    console.log('Something should happen here.');
      let value = ev.target.value;
      let name = ev.target.name;
        return ((
          <div>
            <input 
              placeholder='task' 
              value=''
                onChange={e => setToDoItem(e.target.value)}
                />

            <input 
              placeholder='description' 
              value=''
                onChange={e => setItemDescription(e.target.value)}
                />
          </div>
          ));
    }

  function onDeleteItem (ev) {
    console.log(toDoItem);
    let value = toDoItem;
    setDeleted(true);
    console.log('Deleting item: ', toDoItem, list);
  }


  return (
    <div className="App">
        <header className="App-header">
          <div className="title">
            <h1>My To-Do list</h1>
          </div>
        </header>
        

        <div className="Container">
          <div className="item-list">
            {list.map(item => {
              return (
                <div>
                    <p><input type="checkbox" defaultChecked={false} /><b>{item.toDoItem}  </b>  {item.itemDescription} 
                <button onClick={onToDoItemChange}>Edit</button>   <button onClick={onDeleteItem}>Delete</button></p>
                
                </div>
                );
            })}
          </div>
        </div>

        <div className="item-form">
          <form onSubmit={onAddItem}>
            <label>Item:
              <input
              placeholder="Add a thing to do "
              value={toDoItem}
              onChange={e => setToDoItem(e.target.value)}
              />
            </label>
            <label><p> Details: 
              <input
              placeholder=" "
              value={itemDescription}
              onChange={e => setItemDescription(e.target.value)}
              /></p>
              <button>Submit</button>
            </label>
          </form>
        </div>


      <footer><h5>(C) Fabulous Productions 2021</h5></footer>
    
    </div>
  );
}

export default App;
