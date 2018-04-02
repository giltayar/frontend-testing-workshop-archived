const React = require('react')
const Display = require('./display')
const Keypad = require('./keypad')
const calculator = require('./calculator')

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {calculator: calculator.initialState}
  }

  render () {
    return (
      <div>
        <Display display={this.state.calculator.display} />
        <Keypad onKeypad={(key) => {
          const nextState = calculator.nextState(this.state.calculator, key)

          this.setState({calculator: nextState})
          if (nextState.tape) {
            this.props.onTape(nextState.tape)
          }
        }} />
      </div>
    )
  }
}
