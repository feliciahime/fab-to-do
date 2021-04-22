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
  const [isCompleted, setIsCompleted] = useState(false);
  const [limitBy, setLimitBy] = useState(false);
  const [taskType, setTaskType] = useState(null);
  const [listMap, setListMap] = useState({});

  // so the key for listMap should get used in the JSX template {key}.
  const [list, setList] =  useState([
    { task: 'Read a book', 
      details: '50 pages',  
      isCompleted: false, 
      image: goalImage,
      type: 'goals'},
    { task: 'Write a poem', 
      details: 'haiku', 
      isCompleted: false, 
      image: workImage,
      type: 'work'},
    { task: 'Cook Dinner', 
      details: 'Fish and chips',  
      isCompleted: false,
      image: socialImage,
      type: 'social'},
  ]);
  console.log("Booting up what to do...", list);

  const [editModalIndex, setEditModalIndex] = useState(null);

  function createList (ev) {
    let value = ev.target.value;
    console.log("Let's create a new list!");
    const newList = {
      value: []
    };
    setListMap(newList);
    console.log('Here it is: ', newList);
  }

function setListName (ev) {}

  function onAddItem (ev) {
    console.log('This button works');
    ev.preventDefault();
    const newItem = {
      task: toDoItem, 
      details: itemDescription, 
      isCompleted: false,
      type: taskType, 
    };
    setList([
      ...list,
      newItem
    ]);
    console.log('Item added: ', newItem, list);

  }
      
  function onLimitByChange(ev) {
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

  function onDetailsChange (ev) {
    console.log('Changing details...');
      let value = ev.target.value;
      const updatedItem = {
        ...list[editModalIndex],
      details: value,
      };
      setList([
      ...list.slice(0, editModalIndex),
      updatedItem,
      ...list.slice(editModalIndex + 1),
      ])
    }


  function onTypeChange (ev) {
    console.log('Changing task type...');
      let value = ev.target.value;
      const updatedItem = {
        ...list[editModalIndex],
      type: value,
      };
      setList([
      ...list.slice(0, editModalIndex),
      updatedItem,
      ...list.slice(editModalIndex + 1),
      ])
    }
 

  function onDeleteItem () {
    const listCopy = list.slice();
    listCopy.splice(editModalIndex, 1);
    setList(listCopy);
    setEditModalIndex(null);
    let value = toDoItem;
    console.log("Here's what you have now: ", list);
  }

// create new list modal so that it opens and you can create the name of the list (value: [])
  return (
    <div className="App">
        <header className="App-header">
          <h1 className="title">My To-Do list</h1>
          <button onClick={createList}>+ New List</button>
          
          <label> Show
            <select onChange={onLimitByChange} value={limitBy}>
              <option value="all">all</option>
              {
                taskTypes.map(taskType => (
                  <option value={taskType.type}>{taskType.type}</option>
                ))
              }
            </select> tasks:
          </label>
        </header>
        

        <div className="Container">
          <div className="item-list">
            {list

              .filter(toDoItem => limitBy === false || toDoItem.type === limitBy)
              .map((toDoItem, index) => (
                <div className="task-list">
                    <p><input type="checkbox" defaultChecked={false} /><b>      {toDoItem.task}  </b>  {toDoItem.details} 
                    <button onClick={() => setEditModalIndex(index)}>Edit</button>
                    <div className="line">_________________________________________________________________________________</div></p> 
    {
                  editModalIndex === index ? (
                    <div className="EditModal">
                      <div className="EditModal-backdrop"></div>
                      <div className="EditModal-contents">
                        <div className="EditModal-title">Edit Task</div>
                          <input 
                            value={list[editModalIndex].task}
                            onChange={onToDoItemChange}
                          />
                          <input 
                            value={list[editModalIndex].details}
                            onChange={onDetailsChange} 
                          />
                          <select value={taskType} onChange={onTypeChange}>
                              <option value="category">category</option>
                              {
                                taskTypes.map(taskType => (
                                  <option 
                                      value={taskType.type}>
                                      {taskType.type}
                                      </option>
                                ))
                              }
                            </select>


                <button onClick={onDeleteItem}>Delete</button>
                <button onClick={() => setEditModalIndex(null)}>Save</button>
                  </div>
                </div>
              ) : null
            }
                </div>
                ))}
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
                placeholder=""
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
                />
              </label>
             <select value={taskType} onChange={e => setTaskType(e.target.value)}>
              <option value="category">category</option>
              {
                taskTypes.map(taskType => (
                  <option 
                      value={taskType.type}>
                      {taskType.type}
                      </option>
                ))
              }
            </select>
              <button onClick={onAddItem}>Submit</button>
          </div>
        </div>


      <footer><h5>(C) Fabulous Productions 2021</h5></footer>
    
    </div>
  );
}

export default App;
