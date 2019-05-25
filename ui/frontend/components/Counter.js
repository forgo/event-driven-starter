import React from 'react'
import Layout from '../layout/Layout'
import Button from './Button'
import CounterPopupContainer from './CounterPopupContainer'
import { boxShadowNormal } from '../contexts/ShadowContext'
import { fontFamilySerif, fontFamilyMonospace } from '../utils/fontUtil'

const styleContainer = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}

const styleCountContainer = {
  display: 'flex',
  marginRight: '1ex',
  fontSize: '3em',
  color: '#F9F9F9',
}

const styleCountLabel = {
  marginRight: '1ex',
  fontWeight: 'bold',
  fontFamily: fontFamilySerif(),
}

const styleCount = {
  display: 'flex',
  flexWrap: 'wrap',
  transition: 'font-size 1s',
  fontFamily: fontFamilyMonospace(),
}

const styleCountUpdate = {
  fontSize: '4em',
}

const styleButton = {
  margin: '0 auto 0.309em auto',
  boxShadow: boxShadowNormal,
}

export default class Counter extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.calculating && !this.props.calculating) {
    }
  }

  render() {
    const { count, incrementCounter, popupShow, calculating } = this.props

    const wrappableCount = [...count].map((c, index) => {
      return <span key={index}>{c}</span>
    })

    return (
      <div style={styleContainer}>
        <div style={{ display: 'flex' }}>
          <div style={styleCountContainer}>
            <label htmlFor="count" style={styleCountLabel}>
              Count:
            </label>
            <output id="count" name="count" style={styleCount}>
              {wrappableCount}
            </output>
          </div>
          <Button
            style={styleButton}
            text="Increment"
            title="Confirm or cancel increment popup"
            onClick={() => popupShow(count)}
            disabled={calculating}
            disabledText={'Calculating...'}
          />
        </div>
        <CounterPopupContainer />
      </div>
    )
  }
}
