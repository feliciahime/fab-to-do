import React, { useState } from 'react';
import './App.css';

import workImage from './images/work.png';
import goalImage from './images/goals.png';
import socialImage from './images/social.png';

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [limitBy, setLimitBy] = useState(false);
  const [listType, setListType] = useState([
    {type: 'work'},
    {type: 'goals'},
    {type: 'social'},
  	]);
  const [listMap, setListMap] = useState({});
  const [newName, setNewName] = useState("");

  const [list, setList] =  useState([
    { task: 'Read a book', 
      details: '50 pages',  
      isCompleted: false, 
      image: goalImage,
      type: 'Goals'},
    { task: 'Write a poem', 
      details: 'haiku', 
      isCompleted: false, 
      image: workImage,
      type: 'Work'},
    { task: 'Cook Dinner', 
      details: 'Fish and chips',  
      isCompleted: false,
      image: socialImage,
      type: 'Social'},
  ]);
  console.log("Booting up what to do...", listType);

  const [editModalIndex, setEditModalIndex] = useState(null);

  function createList (ev) {
    console.log("Let's create a new list!");
  	ev.preventDefault();
    const newType = {type: newName};
    setListType([
      ...listType,
      newType
    ]);
    console.log('Category added: ', newName);
    console.log('Here are all the categories: ', listType);
  }

  function createListName (ev) {
  	let newName = ev.target.value;
  }

//create buttons to setLimitBy=true and listType; then create functions for onClick events with buttons

  function onAddItem (ev) {
    console.log('This button works');
    ev.preventDefault();
    const newItem = {
      task: toDoItem, 
      details: itemDescription, 
      isCompleted: false,
      type: listType, 
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

  return (
    <div className="App">
        <header className="App-header">
          <h1 className="title">My To-Do list</h1>
			<div className="Add-List-Type">
			
            <label>Item:
            <input
            placeholder="Add a new list "
            value={newName}
            onChange={e => setNewName(e.target.value)}
            />
          	</label>
            <button onClick={createList}>+ New List</button>
          </div>
          <label> Show
            <select onChange={onLimitByChange} value={limitBy}>
              <option value="all">all</option>
              {
                listType.map(listType => (
                  <option value={listType.type}>{listType.type}</option>
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
                          <select value={listType} onChange={onTypeChange}>
                              <option value="category">category</option>
                              {
                                listType.map(listType => (
                                  <option 
                                      value={listType.type}>
                                      {listType.type}
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
             <select value={listType} onChange={e => setListType(e.target.value)}>
              <option value="category">category</option>
              {
                listType.map(listType => (
                  <option 
                      value={listType.type}>
                      {listType.type}
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
