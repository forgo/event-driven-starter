import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../actions/AuthActions'

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    loggingIn: state.auth.loggingIn,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default LoginContainer
