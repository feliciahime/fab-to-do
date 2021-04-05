import React, { useState } from 'react';
import './App.css';

console.log("Booting up what to do...");

function App() {
  const [toDoItem, setToDoItem] = React.useState("");
  const [itemDescription, setItemDescription] = React.useState("");
  const [list, setList] =  React.useState([]);
  const [isDeleted, setDeleted] = useState(false);


  function onAddItem (ev) {
    console.log('This button works');
    ev.preventDefault();
    setList([...list, { toDoItem: toDoItem, itemDescription: itemDescription}
      ]);
    }
      

  function onToDoItemChange (ev) {
      let value = ev.target.value;
      let name = ev.target.name;

      if (name === 'toDoItem') { setToDoItem(value)}
      if (name === 'itemDescription') {setItemDescription(value)}
      if (name === 'isDeleted') {setDeleted(value)}

      setToDoItem(value);
      console.log('updated item: ', value);
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
                <div><b>{item.toDoItem}  </b> {item.itemDescription} <input type="checkbox" defaultChecked={false} />
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
