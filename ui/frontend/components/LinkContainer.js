import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Link from './Link'

const mapDispatchToProps = {
  push,
}

const LinkContainer = connect(
  null,
  mapDispatchToProps
)(Link)
export default LinkContainer
