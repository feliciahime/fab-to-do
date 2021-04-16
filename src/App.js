import React, { useState } from 'react';
import './App.css';

import workImage from './images/work.png';
import goalImage from './images/goals.png';
import socialImage from './images/social.png';

const taskTypes = [
    {type: 'work', imageSrc: workImage},
    {type: 'goals', imageSrc: goalImage},
    {type: 'social', imageSrc: socialImage},
  ];

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [limitBy, setLimitBy] = useState(false);
  const [list, setList] =  useState([
    { task: 'Read a book', 
      details: '50 pages', 
      isDeleted: false, 
      isCompleted: false, 
      image: goalImage,
      type: 'goals'},
    { task: 'Write a poem', 
      details: 'haiku', 
      isDeleted: false, 
      isCompleted: false, 
      image: workImage,
      type: 'work'},
    { task: 'Cook Dinner', 
      details: 'Fish and chips', 
      isDeleted: false, 
      isCompleted: false,
      image: socialImage,
      type: 'social'},
  ]);
  console.log("Booting up what to do...", list);

  const [editModalIndex, setEditModalIndex] = useState(null);
  // const [inHover, setHover] = useState(false);


  function onAddItem (ev) {
    console.log('This button works');
    ev.preventDefault();
    const newItem = {
      task: toDoItem, 
      details: itemDescription, 
      isDeleted: false, 
      isCompleted: false, 
    };
    setList([
      ...list,
      newItem
    ]);
    console.log('Item added: ', newItem, list);

  }
      
  function onLimitByChange(ev) {
    // Will be used by challenge 5
    const value = ev.target.value;
    console.log('onLimitByChange', value);
    if (value === 'all') {
      setLimitBy(false); // if "all" is selected, set to false
    } else { // otherwise, just set with value
      setLimitBy(value);
    }
  }


  function onToDoItemChange (ev) {
    console.log('Something should happen here.');
      let value = ev.target.value;
      const updatedItem = {
        ...list[editModalIndex],
      task: value,
      };
      setList([
      ...list.slice(0, editModalIndex),
      updatedItem,
      ...list.slice(editModalIndex + 1),
      ])
    }
      

  function onDeleteItem () {
    console.log(toDoItem);
    let value = toDoItem;
    setIsDeleted(true);
    console.log('Deleting item: ', toDoItem, list);
  }


  return (
    <div className="App">
        <header className="App-header">
          <h1 className="title">My To-Do list</h1>
          <label>Only show:
            <select onChange={onLimitByChange} value={limitBy}>
              <option value="all">all</option>
              {
                taskTypes.map(taskType => (
                  <option value={taskType.type}>{taskType.type}</option>
                ))
              }
            </select>
          </label>
        </header>
        

        <div className="Container">
          <div className="item-list">
            {list.map(list => {
              return (
                <div>
                    <p><input type="checkbox" defaultChecked={false} /><b>{list.task}  </b>  {list.details}</p> 
                <p><button onClick={onToDoItemChange}>Edit</button> <button onClick={onDeleteItem}>Delete</button></p>
                
                </div>
                );
            })}
          </div>
        
          <div className="add-task">
              <label>Item:
                <input
                placeholder="Add a thing to do "
                value={toDoItem}
                onChange={e => setToDoItem(e.target.value)}
                />
              </label>
              <label>Details: 
                <input
                placeholder=" "
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
                />
              </label>
              <button onClick={onAddItem}>Submit</button>
          </div>
        </div>


      <footer><h5>(C) Fabulous Productions 2021</h5></footer>
    
    </div>
  );
}

export default App;
