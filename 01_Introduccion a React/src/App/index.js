import React from "react";
import { useState, useEffect } from "react";
import { AppUI } from "./AppUI";

// import './App.css';

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true},
//   {text: 'Tomar el curso de intro a React', completed: false},
//   {text: 'Llorar con la llorona', completed: true},
//   {text: 'Tomar con la llorona', completed: false},
// ]

function useLocalStore(itemName, initialValue) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      try{
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (localStorageItem){
          parsedItem = JSON.parse(localStorageItem)
        } else {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        }

        setItem(parsedItem);
        setLoading(false);
      } catch(error){
        setError(error)
      }
    }, 1000);
  });


  const saveItem = (newTodos) => {
    try {
      const stringifiedItems = JSON.stringify(newTodos);
      localStorage.setItem(itemName, stringifiedItems);
      setItem(newTodos)
    } catch (error) {
      setError(error);
    }
  };
  return {
    item,
    saveItem,
    loading,
    error,
  };
}



function App() {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStore('TODOS_V1', []);
  
  const [searchValue, setSearchValue] = useState('');

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (searchValue.length === 0){
    searchedTodos = todos
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLocaleLowerCase();
      const searchText = searchValue.toLocaleLowerCase();
      return todoText.includes(searchText);
    });
  }

  

  const completeTodo = (item) => {
    if (item.completed === false){
      const todoIndex = todos.findIndex(todo => todo.text === item.text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      saveTodos(newTodos);
    } else {
      const todoIndex = todos.findIndex(todo => todo.text === item.text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = false;
      saveTodos(newTodos);
    }
  }

  const deleteTodo = (text) => {
    const deleteIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(deleteIndex, 1);
    saveTodos(newTodos);
  }



  return (
    <AppUI
    loading={loading}
    error={error}
    totalTodos={totalTodos}
    completedTodos={completedTodos}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={completeTodo}
    deleteTodo={deleteTodo}
    />
  )
}

export default App;
