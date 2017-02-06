const React = require('react')
const e = React.createElement
const calculator = require('./calculator')
const DisplayComponent = require('./display-component')
const KeypadComponent = require('./keypad-component')

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = calculator.initialState
  }

  render () {
    return (
      e('div', null,
        e(DisplayComponent, {display: this.state.display}),
        e(KeypadComponent, {onKeypad: (key) => this.setState(calculator.nextState(this.state, key))}))
    )
  }
}
