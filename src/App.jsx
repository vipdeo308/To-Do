import React, { useState } from 'react';
import './App.css';

const TodoItem = ({ item, index, deleteTodoItem, completeTodoItem, updateTodoItem }) => {
    return (
        <div className="todo-list">
            <li style={{textDecoration: item.complete ? "line-through" : ""}}>{item.todo}</li>
            <div className="btns">
                <button onClick={() => completeTodoItem(index)}>Complete</button>
                <button onClick={() => updateTodoItem(index)}>Update</button>
                <button onClick={() => deleteTodoItem(index)}>X</button>
            </div>
        </div>
    )
}

const TodoInput = ({createTodoItem}) => {
  const [value, setValue] = React.useState("")
  
  const handleSubmit = e => {
    e.preventDefault();
    
    if(value === "")
        return console.log("Please Add Something To-Do!")
    
    createTodoItem(value)
    setValue("")
  }
  
  return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Create todo" value={value} onChange={(e) => setValue(e.target.value)}/>
          <button onClick={handleSubmit}>Create</button>
      </form>
  );
}

function App() {

  const [todoItems, setTodoItems] = React.useState(
    [{todo: 'Mow the lawn',
    complete: false},
    {todo: 'Do Laundry',
    complete: false},
    {todo: 'Make Dinner',
    complete: true}]
  );
  
  const createTodoItem = (todo) => {
      const newTodoItems = [...todoItems, { todo, complete: false }];
      setTodoItems(newTodoItems);
  };  
  
  const deleteTodoItem = (index) => {
      const newTodoItems = [...todoItems];
      newTodoItems.splice(index, 1);
      setTodoItems(newTodoItems);
  } 
  
  const completeTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].complete === false? (newTodoItems[index].complete = true) : (newTodoItems[index].complete = false);
    setTodoItems(newTodoItems)
  };
  
  const updateTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    const item = newTodoItems[index];
    let newItem = prompt(`Update ${item.todo}?`, item.todo);
    let todoObj = { todo: newItem, complete: false };
    newTodoItems.splice(index, 1, todoObj);
    
    if (newItem === null || newItem === "")
        return;
    else 
        item.todo = newItem;
  
    setTodoItems(newTodoItems);
  };

  return (
    <div className="app">
        <TodoInput createTodoItem={createTodoItem} />
        {
            todoItems.map((item, index) => (
                <TodoItem key={index} index={index} item={item} deleteTodoItem={deleteTodoItem} completeTodoItem={completeTodoItem} updateTodoItem={updateTodoItem}/>
            ))
        }
    </div>
  );
}

export default App;
