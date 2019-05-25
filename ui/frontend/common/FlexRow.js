import React from 'react'

const style = {
  display: 'flex',
  flexDirection: 'row',
}

export default class FlexRow extends React.Component {
  render() {
    const styles = Object.assign({}, style, this.props.style)
    return <div style={styles}>{this.props.children}</div>
  }
}
