import React from 'react'
import FlexColumn from '../common/FlexColumn'
import FlexRow from '../common/FlexRow'
import ThemeProvider from '../contexts/ThemeProvider'
import Background from './Background'
import Header from './Header'
import Alert from './Alert'
import Left from './Left'
import Main from './Main'
import Right from './Right'
import Footer from './Footer'

const styleFlexColumn = {
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
}

const styleFlexRow = {
  flex: '1 1 auto',
  position: 'relative',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '100%',
}

export default class Layout extends React.Component {
  render() {
    const { header, alert, alertError, left, main, right, footer } = this.props

    const headerElement = header ? <Header>{header}</Header> : null
    const alertElement = alert ? (
      <Alert isError={alertError}>{alert}</Alert>
    ) : null
    const leftElement = left ? <Left>{left}</Left> : null
    const mainElement = main ? <Main>{main}</Main> : null
    const rightElement = right ? <Right>{right}</Right> : null
    const footerElement = footer ? <Footer>{footer}</Footer> : null

    return (
      <ThemeProvider>
        <Background>
          <FlexColumn style={styleFlexColumn}>
            {headerElement}
            {alertElement}
            <FlexRow style={styleFlexRow}>
              {leftElement}
              {mainElement}
              {rightElement}
            </FlexRow>
            {footerElement}
          </FlexColumn>
        </Background>
      </ThemeProvider>
    )
  }
}
