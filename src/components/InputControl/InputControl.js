import React from 'react'
import style from './InputControl.module.css'

function InputControl(props) {
  return (
    <>
        {props.label && <label htmlFor={props.type} className={style.label}>{props.label}</label>}
        <input type={props.type} id={props.type} className={style.input} {...props} />
    </>
  )
}

export default InputControl;