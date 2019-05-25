import React from 'react'
import { Route, Redirect } from 'react-router'
import { ROUTE } from '../routing'

export default class SecureRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props
    const { loggedIn, loggingIn } = this.props

    // render secured component if we are indeed logged in
    const secureComponent = <Component {...props} />

    // prevent redirects to login page if we're actively trying to log in
    const loginRedirect = loggingIn ? null : <Redirect to={ROUTE.login.path} />

    return (
      <Route
        {...props}
        render={props => (loggedIn ? secureComponent : loginRedirect)}
      />
    )
  }
}
