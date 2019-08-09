import React from 'react'
import { useGlobalMouse } from '../effects/Effects'
import { fontFamilySansMonospace, fontFamilyMonospace } from '../utils/fontUtil'

export default function InteractiveMeasure() {
  const globalMouse = useGlobalMouse()
  const { position, originPosition, rect } = globalMouse

  function styleRect(globalMouse) {
    const { rect } = globalMouse

    if (!rect) {
      return { display: 'none' }
    }
    return {
      display: 'block',
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      background: 'rgba(255,255,255,0.4)',
      padding: 0,
      margin: 0,
      zIndex: 4,
    }
  }

  function stylePositions(globalMouse) {
    const { rect } = globalMouse

    if (!rect) {
      return { display: 'none' }
    }
    return {
      position: 'absolute',
      top: 0,
      width: '100%',
      textAlign: 'center',
      fontFamily: fontFamilyMonospace(),
      fontSize: '0.618em',
      padding: '0.309em 0',
      borderRadius: '0.105em',
      background: 'rgba(0,0,0,0.309)',
    }
  }

  function styleDimensions(globalMouse) {
    const { position, originPosition, rect } = globalMouse

    if (!rect) {
      return { display: 'none' }
    }
    return {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      fontFamily: fontFamilyMonospace(),
      fontSize: '0.618em',
      padding: '0.309em 0',
      borderRadius: '0.105em',
      background: 'rgba(0,0,0,0.309)',
    }
  }

  const positions = rect ? (
    <div style={stylePositions(globalMouse)}>
      <div>{`x0:${originPosition.x}px, y0:${originPosition.y}px`}</div>
      <div>{`x:${position.x}px, y:${position.y}px`}</div>
    </div>
  ) : null
  const dimensions = rect ? (
    <div style={styleDimensions(globalMouse)}>{`w:${rect.width}px, h:${
      rect.height
    }px`}</div>
  ) : null

  return (
    <div style={styleRect(globalMouse)}>
      {positions}
      {dimensions}
    </div>
  )
}
