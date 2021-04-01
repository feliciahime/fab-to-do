import React, { useState } from 'react';
import './App.css';

console.log("Booting up what to do...");

function App() {
  const [toDoItem, setToDoItem] = useState([]);
  const [isDeleted, setDeleted] = useState(false);
  const [isDone, setIsDone] = useState(false);

  function onAddItem (ev) {
    console.log('This button works');

  }

  function onToDoItemChange (ev) {
    let value = ev.target.value;
    setToDoItem(value);
  }

function onShowList (ev) {

}


  // function onCheckOff (ev) {
  //   let value = ev.target.value;
  //   if (setIsDone === false) (
  //     setIsDone(true);
  //   ) else: (
  //     setIsDone(false))
  // }


  return (
    <div className="App">
        <header className="App-header">
          <style>@import url('https://fonts.googleapis.com/css2?family=Meddon&display=swap');
          </style>
          <div className="title">
            <h1>My To-Do list</h1>
          </div>
        </header>
        
        <body>
        <div className="Container">
          <p><textarea id="newitem"
          placeholder="Add an item to the list"
          value={toDoItem}
          onChange={onToDoItemChange}
          /></p>
          <p><button onClick={onAddItem}> Add me! </button></p>

          <div className="Checkbox">
            <p>{ 
              toDoItem.length === 0 ? 
              `<input type="checkbox" defaultChecked={false} /> {toDoItem}` :  ''      }</p>
          </div>

        </div>
        </body>
      <footer><h5>(C) Fabulous Productions 2021</h5></footer>
    
    </div>
  );
}

export default App;
