import React from "react";
import { TodoCounter } from "../components/TodoCounter.jsx";
import { TodoSearch } from "../components/TodoSearch.jsx";
import { TodoList } from "../components/TodoList.jsx";
import { TodoItem } from "../components/TodoItem.jsx";
import { CreateTodoButton } from "../components/CreateTodoButton.jsx";


function AppUI(
    {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
    }) {
    return (
        <>
            <TodoCounter
                total={totalTodos}
                completed={completedTodos}
            />

            <TodoSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <TodoList>

                {searchedTodos.map(todo => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>
                {error && <p>Desespera, tenemos un error</p>}
                {loading && <p>No desesperes estamos cargando...</p>}
                {(!loading && !searchedTodos.lenght) && <p>!No se encontraron coincidencias</p>}
                {(!loading && !totalTodos) && <p>Crea tu primer todo</p>}

            <CreateTodoButton />
        </>
    )
}

export { AppUI}