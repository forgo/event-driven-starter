import { connect } from 'react-redux'
import Counter from './Counter'
import { incrementCounter, popupShow } from '../actions/CounterActions'

const mapStateToProps = state => {
  return {
    count: state.counter.count,
    calculating: state.counter.calculating,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementCounter: count => dispatch(incrementCounter(count)),
    popupShow: count => dispatch(popupShow(count)),
  }
}

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
export default CounterContainer
