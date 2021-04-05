My Fab-to-do List
Felicia Becerra
03-29-2021

This project uses React to create a To-do list.

// 08405E darkblue
// 469DB7 light blue
// 2B5B55 green
// AECE74 light green
// FEFEFB off white

// dark green 41585A
// deep green 1F352F
// beige E8D5B3



// 

<div className="Container">
            <div className="Form">
            <input
          placeholder="Add a thing to do"
          value={toDoItem}
          onChange={onToDoItemChange}
        />
          


function onShowList (ev) {
let total = toDoItem.length;
  if (total > 0) {
    return (
      <ul className="item-list">
          <li />{toDoItem.item} <input type="checkbox" defaultChecked={false} />
      </ul>
    );
  }
}

  // function onCheckOff (ev) {
  //   let value = ev.target.value;
  //   if (setIsDone === false) (
  //     setIsDone(true);
  //   ) else: (
  //     setIsDone(false))
  // }


  function onToDoItemChange (ev) {
    let value = ev.target.value;
    setToDoItem(value);
    console.log('your new item is: ', value);
    console.log(toDoItem);
  }



    const listItems = toDoItem.map((todo)) =>
    <li>{todo}</li>


                  <ul className="item-list">
              <li />{toDoItem} <input type="checkbox" defaultChecked={false} />
              </ul>