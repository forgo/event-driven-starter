import React from 'react'
import { default as A } from './LinkContainer'
import { ROUTE } from '../routing'

const styleList = {
  margin: 0,
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  listStyle: 'none',
}

const styleListItem = {
  margin: '0 0.309em',
}

const styleLink = {
  color: 'DeepSkyBlue',
}

export default class Navigation extends React.Component {
  handleLogout = event => {
    const { logout } = this.props
    if (logout) {
      logout()
    }
  }

  render() {
    const { loggingIn, loggedIn, user, logout, location } = this.props

    const onLoginPage = location.pathname === ROUTE.login.path

    const linkLogin = onLoginPage ? null : (
      <li style={styleListItem}>
        <A path={ROUTE.login.path}>login</A>
      </li>
    )

    const linkLogout = (
      <li style={styleListItem}>
        <A onClick={this.handleLogout}>logout</A>
      </li>
    )

    return (
      <nav role="navigation">
        <ul style={styleList}>{loggedIn ? linkLogout : linkLogin}</ul>
      </nav>
    )
  }
}
