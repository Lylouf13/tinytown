import React from 'react'
import './button.scss'

export default function Button({ label, active=true, onClick } : { label: string,  active?: boolean, onClick: () => void }) {
  return (
    <button className={active === true ? "button" : "button-disabled"} onClick={active === true ? onClick : () => null}>{label}</button>
  )
}
