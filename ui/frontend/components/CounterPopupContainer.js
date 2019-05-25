import { connect } from 'react-redux'
import CounterPopup from './CounterPopup'
import { popupCancel, popupConfirm } from '../actions/CounterActions'

const mapStateToProps = state => {
  return {
    count: state.counter.count,
    nextCount: state.counter.nextCount,
    calculating: state.counter.calculating,
    popup: state.counter.popup,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    popupCancel: () => dispatch(popupCancel()),
    popupConfirm: nextCount => dispatch(popupConfirm(nextCount)),
  }
}

const CounterPopupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPopup)
export default CounterPopupContainer
