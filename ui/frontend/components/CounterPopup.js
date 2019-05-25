import React from 'react'
import Button from './Button'
import { fontFamilySerif, fontFamilyMonospace } from '../utils/fontUtil'

const styleContainer = display => {
  return {
    display: display ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    background: 'rgba(0,0,0,0.618)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
}
const styleContent = {
  background: '#F9F9F9',
  padding: '1em',
  border: '1px solid black',
  borderRadius: '0.618em',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const styleCountWrapper = {
  margin: '0 0 1.618em 0',
  width: '100%',
}

const styleCountLabel = {
  fontWeight: 'bold',
  display: 'block',
  textAlign: 'center',
  textDecoration: 'underline',
  fontFamily: fontFamilySerif(),
  fontSize: '1.618em',
}

const styleCount = {
  display: 'block',
  textAlign: 'center',
  fontFamily: fontFamilyMonospace(),
  fontSize: '1.618em',
}

const styleActions = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

const styleCancelButton = {
  background: '#8B0000',
  marginRight: '1em',
}

const styleCancelButtonFocus = {
  outline: '2px dashed black',
}

const styleConfirmButton = {}

const styleConfirmButtonFocus = {
  outline: '2px dashed black',
}

class CounterPopup extends React.Component {
  render() {
    const {
      count,
      nextCount,
      calculating,
      popup,
      popupCancel,
      popupConfirm,
    } = this.props

    return (
      <div style={styleContainer(popup)}>
        <div style={styleContent}>
          <div style={styleCountWrapper}>
            <label htmlFor="popupCount" style={styleCountLabel}>
              Current Count
            </label>
            <output id="popupCount" name="popupCount" style={styleCount}>
              {count}
            </output>
          </div>

          <div style={styleCountWrapper}>
            <label htmlFor="popupCountNext" style={styleCountLabel}>
              Next Count
            </label>
            <output
              id="popupCountNext"
              name="popupCountNext"
              style={styleCount}
            >
              {nextCount}
            </output>
          </div>

          <div style={styleActions}>
            <Button
              style={styleCancelButton}
              styleFocus={styleCancelButtonFocus}
              text="Cancel"
              title="Cancel increment counter"
              onClick={popupCancel}
              disabled={false}
            />
            <Button
              style={styleConfirmButton}
              styleFocus={styleConfirmButtonFocus}
              text="Confirm"
              title="Confirm increment counter"
              onClick={() => popupConfirm(nextCount)}
              disabled={false}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default CounterPopup
