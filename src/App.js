import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDoItem, setToDoItem] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [limitBy, setLimitBy] = useState(false);
  const [itemType, setItemType] = useState('misc');
  const [listType, setListType] = useState([
    {type: 'work'},
    {type: 'goals'},
    {type: 'social'},
    {type: 'misc'},
  	]);
  const [listMap, setListMap] = useState({});
  const [newName, setNewName] = useState("");

  const [list, setList] =  useState([
    { task: 'Read a book', 
      details: '50 pages',  
      isCompleted: false, 
      type: 'goals'},
    { task: 'Write a poem', 
      details: 'haiku', 
      isCompleted: false,  
      type: 'work'},
    { task: 'Cook Dinner', 
      details: 'Fish and chips',  
      isCompleted: false, 
      type: 'social'},
  ]);

  	// Setting to local storage
function setLocalStorage () {
	localStorage.setItem("todolist", JSON.stringify(list));
}

	// Retrieving from local storage
function getLocalStorage () {
	const listString = localStorage.getItem("todolist")
	if (listString) { // list exists
		const parsedList = JSON.parse(listString);
		setList(parsedList);
	}
}


console.log(list);

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

  function onAddItem (ev) {
    console.log('This button works');
    const value = ev.target.value;
    ev.preventDefault();
    const newItem = {
      task: toDoItem, 
      details: itemDescription, 
      isCompleted: false,
      type: itemType, 
    };
    setList([
      ...list,
      newItem
    ]);
    console.log('Item added: ', newItem, list);

  }
      
  function onLimitByChange (ev) {
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

function setComplete(editModalIndex) {
      const updatedItem = {
        ...list[editModalIndex],
      isCompleted: true,
      };
      console.log(toDoItem.isCompleted);
      setList([
      ...list]);
      // onDeleteItem();
      console.log('Task marked complete: ', updatedItem, list);
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


  function setFilter (ev) {
  	let value = ev.target.value;
  	setLimitBy(value);
    console.log(value);
    }

useEffect (getLocalStorage, []);
useEffect (setLocalStorage, [list]);

  return (
    <div className="App">
        <header className="App-header">
          <h1 className="title">My To-Do list</h1>
			<div className="Add-List-Type">
			
            <label>Item:
            <input
            placeholder="Create new list"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            />
          	</label>
            <button onClick={createList}>+ New List</button>
            <br />
            <br />
          </div>

          <div>
          <button className="list-button"  onClick={setFilter} value='work'>Work List</button>
          <button className="list-button"  onClick={setFilter} value='social'>Social List</button>
          <button className="list-button"  onClick={setFilter} value='goals'>Goals List</button>
          <button className="list-button"  onClick={setFilter} value='misc'>Misc List</button>
          <br />
          <br />
          </div>

          <label>Tasks from 
            <select onChange={onLimitByChange} value={limitBy}>
              <option value="all">all</option>
              {listType

                	.map(listType => (
                 	 <option value={listType.type}>{listType.type}</option>
                ))
              }
            </select> list(s):
          </label>
        </header>
        

        <div className="Container">
          <div className="item-list">
            {list

              .filter(toDoItem => limitBy === false || toDoItem.type === limitBy)
              .map((toDoItem, index) => (
                <div className="task-list">
                	
                    <p><input type="checkbox" onClick={() => setComplete(index)} /><b>      {toDoItem.task}  </b>  {toDoItem.details} 
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
                          <select onChange={onTypeChange} value={listType}>
                              <option value={list[editModalIndex].type}>{list[editModalIndex].type}</option>
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
         	<select>
              <option value={listType.type} onChange={e => setListType(e.target.value)}>category</option>
              {listType.map(listType => (
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
