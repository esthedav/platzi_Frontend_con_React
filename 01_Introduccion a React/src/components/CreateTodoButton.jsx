import React from "react";
import "../styles/CreateTodoButton.css"

function CreateTodoButton() {

    const onClickButton = () => {
        console.log("Aqui se debería abrir el modal")
    }
    return (
        <button className="CreateTodoButton"
            onClick={onClickButton}>
            +
        </button>
    );
}

export { CreateTodoButton };