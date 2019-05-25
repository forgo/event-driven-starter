import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import SecureRoute from './SecureRoute'

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    loggingIn: state.auth.loggingIn,
  }
}

const SecureRouteContainer = withRouter(
  connect(
    mapStateToProps,
    null
  )(SecureRoute)
)
export default SecureRouteContainer
