import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import EventDrivenStarterApp from './EventDrivenStarterApp'

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    loggingIn: state.auth.loggingIn,
    message: state.notification.message,
    isError: state.notification.isError,
  }
}

const EventDrivenStarterAppContainer = withRouter(
  connect(
    mapStateToProps,
    null
  )(EventDrivenStarterApp)
)
export default EventDrivenStarterAppContainer
