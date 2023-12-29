import React from "react";
import './Input.css'

function Input({
  value,
  setValue,
  label,
  control,
  isDisabled = false,
  type = "text",
  tag = "input",
}) {
  function handleChange(e) {
    // setValue({ ...value, [e.target.name]: e.target.value });
    setValue(e.target.value)
  }
  return (
    <div className="inputWrapper">
      {tag === "input" ? (
        <>
          <form className="inputForm" autoComplete="off">
            <input
              className="loginInput"
              type={type}
              name={control}
              id={control}
              value={value[control]}
              onChange={handleChange}
              disabled={isDisabled}
            />
            <label
              className={`loginInputLable ${value[control] && "inputActive"}`}
            >
              {label}
            </label>
          </form>
        </>
      ) : (
        <>
          <textarea
            className="textarea"
            type={type}
            name={control}
            id={control}
            value={value[control]}
            onChange={handleChange}
            disabled={isDisabled}
            style={{ resize: "none", width: "300px", height: "100px" }}
          />
          <label
            className={`textareaLabel ${value[control] && "textareActive"}`}
          >
            {label}
          </label>
        </>
      )}
    </div>
  );
}

export default Input;