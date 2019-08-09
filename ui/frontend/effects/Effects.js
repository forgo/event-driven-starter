import React, { useState, useEffect } from 'react'

const undefinedPosition = { x: null, y: null }

const getRect = globalMouse => {
  const { pressing } = globalMouse
  const { x, y } = globalMouse.position
  const { x: originX, y: originY } = globalMouse.originPosition

  if (
    !pressing ||
    x == null ||
    y == null ||
    originX == null ||
    originY == null
  ) {
    return undefined
  }
  const width = Math.abs(originX - x)
  const height = Math.abs(originY - y)
  const left = originX > x ? x : originX
  const top = originY > y ? y : originY
  return new DOMRect(left, top, width, height)
}

export function useGlobalMouse() {
  const [pressing, setPressing] = useState(false)
  const [originPosition, setOriginPosition] = useState(undefinedPosition)
  const [position, setPosition] = useState(undefinedPosition)

  function resetPosition() {
    setPosition(undefinedPosition)
  }

  function getPosition(e) {
    const x = event.pageX
    const y = event.pageY
    return { x, y }
  }

  function onPressDown(e) {
    setPressing(true)
    setOriginPosition(getPosition(e))
  }

  function onPressUp(e) {
    setPressing(false)
  }

  function onPositionChange(e) {
    setPosition(getPosition(e))
  }

  function disableSelect(e) {
    e.preventDefault()
  }

  useEffect(() => {
    // add mouse events
    window.addEventListener('mousedown', onPressDown, false)
    window.addEventListener('mouseup', onPressUp, false)
    window.addEventListener('mousemove', onPositionChange, false)
    window.addEventListener('mouseenter', onPositionChange, false)
    window.addEventListener('mouseleave', resetPosition, false)
    // window.addEventListener('selectstart', disableSelect, false)

    return () => {
      // remove mouse events
      window.removeEventListener('mousedown', onPressDown, false)
      window.removeEventListener('mouseup', onPressUp, false)
      window.removeEventListener('mousemove', onPositionChange, false)
      window.removeEventListener('mouseenter', onPositionChange, false)
      window.removeEventListener('mouseleave', onPositionChange, false)
      // window.removeEventListener('selectstart', disableSelect, false)
    }
  }, [pressing, position, originPosition])
  const rect = getRect({ pressing, position, originPosition })
  return { pressing, position, originPosition, rect }
}
