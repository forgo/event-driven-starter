import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Navigation from './Navigation'
import { logout } from '../actions/AuthActions'

const mapStateToProps = state => {
  return {
    loggingIn: state.auth.loggingIn,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const NavigationContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
)
export default NavigationContainer
