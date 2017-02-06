const React = require('react')
const e = React.createElement
const calculator = require('./calculator')
const DisplayComponent = require('./display-component')

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = calculator.initialState
  }

  render () {
    return (
      e(DisplayComponent, {display: this.state.display})
    )
  }
}
