import React, { useState } from "react";

export default function Input(props) {

    const [inputValue , changeInputValue] = useState(props.defaultValue ?? '')


    // handler => 
    const inputChangeHandler = (event) => {
        changeInputValue(event.target.value)
        props.onSaveHandler(
            {
                type : 'SAVE_INPUT_DATA' ,
                payload : {
                    name : props.name ,
                    value : event.target.value
                }
            }
        )
    }
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.class}

        value={inputValue}
        onChange={inputChangeHandler}
      />
    </>
  );
}
