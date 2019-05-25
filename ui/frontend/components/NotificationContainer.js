import { connect } from 'react-redux'
import Notification from './Notification'
import { notificationHide } from '../actions/NotificationActions'

const mapStateToProps = state => {
  return {
    loggingIn: state.auth.loggingIn,
    message: state.notification.message,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    notificationHide: () => dispatch(notificationHide()),
  }
}

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
export default NotificationContainer
