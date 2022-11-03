import React from "react";
import "../styles/TodoSearch.css"

function TodoSearch({ searchValue, setSearchValue }) {

    const onSearchValueChange = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value)
    }
    return (
        <input 
            className="TodoSearch" 
            placeholder="Cebolla"
            value={searchValue}
            onChange={onSearchValueChange}
            />
    );
}

export { TodoSearch };