import React, { useState, useRef } from 'react'
import { useGlobalMouse } from '../effects/Effects'
import { mergeButtonStyles } from '../style/buttonStyles'

export default function HookButton(props) {
  const globalMouse = useGlobalMouse()

  const [hovering, setHovering] = useState(false)
  const [pressing, setPressing] = useState(false)
  const [focusing, setFocusing] = useState(false)

  const {
    id,
    title,
    text,
    type,
    ariaExpanded,
    ariaSelected,
    disabled,
    disabledText,
  } = props

  const { pressing: pressingGlobal } = globalMouse

  const styleMerged = mergeButtonStyles(hovering, pressing, focusing, disabled)
  return (
    <button
      id={id}
      style={styleMerged}
      onClick={() => console.log('HookButton *click*')}
      onMouseOver={() => {
        setHovering(true)
        setPressing(pressingGlobal)
      }}
      onMouseOut={() => {
        setHovering(false)
        setPressing(false)
      }}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      onFocus={() => setFocusing(true)}
      onBlur={() => setFocusing(false)}
      title={title}
      type={type}
      aria-expanded={ariaExpanded}
      aria-selected={ariaSelected}
      aria-label={title || text}
      disabled={disabled}
    >
      {disabled ? disabledText : text}
    </button>
  )
}
