import React from 'react'
import SecureRouteContainer from './SecureRouteContainer'
import Layout from '../layout/Layout'
import Header from './Header'
import NotificationContainer from './NotificationContainer'
import LoginRequired from './LoginRequired'
import CounterContainer from './CounterContainer'

import { Route, Switch } from 'react-router'
import { ROUTE } from '../routing'

import LoginContainer from './LoginContainer'
import NotFound from './NotFound'

class EventDrivenStarterApp extends React.Component {
  render() {
    const { loggedIn, message, isError } = this.props

    const header = <Header />
    const alert = message ? <NotificationContainer /> : null
    const main = (
      <Switch>
        <SecureRouteContainer
          exact
          path={ROUTE.home.path}
          component={CounterContainer}
        />
        <Route exact path={ROUTE.login.path} component={LoginContainer} />
        <Route exact path={ROUTE.error.path} component={Error} />
        <Route component={NotFound} />
      </Switch>
    )

    return (
      <Layout
        header={header}
        alert={alert}
        alertError={isError}
        left={null}
        main={main}
        right={null}
        footer={null}
      />
    )
  }
}
export default EventDrivenStarterApp
