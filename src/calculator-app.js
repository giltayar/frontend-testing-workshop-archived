const React = require('react')
const Display = require('./display')
const Keypad = require('./keypad')
const Tape = require('./tape')
const calculator = require('./calculator')

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {calculator: calculator.initialState, tape: []}
  }

  render () {
    return (
      <div>
        <Display display={this.state.calculator.display} />
        <Keypad onKeypad={(key) => {
          const nextState = calculator.nextState(this.state.calculator, key)
          if (nextState.tape) {
            this.setState({tape: this.state.tape.concat(nextState.tape)})
          }
          this.setState({calculator: nextState})
        }} />
        <Tape tape={this.state.tape} />
      </div>
    )
  }
}
