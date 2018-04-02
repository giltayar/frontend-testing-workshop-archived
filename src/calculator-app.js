const React = require('react')
const Display = require('./display')
const Keypad = require('./keypad')
const Tape = require('./tape')
const calculator = require('./calculator')

const tapeApiUrl = process.env.NODE_ENV === 'production' ? '/tape' : 'http://localhost:3001/tape'

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {calculator: calculator.initialState, tape: []}
  }

  async componentDidMount () {
    console.log(process.env.NODE_ENV)
    const response = await fetch(tapeApiUrl)
    if (response.ok) {
      const tape = await response.json()
      this.setState({tape})
    } else {
      this.setState({tape: ['error loadig tape!']})
    }
  }

  async saveTape (tape) {
    await fetch(tapeApiUrl, {method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tape)}
    )
  }

  render () {
    return (
      <div>
        <Display display={this.state.calculator.display} />
        <Keypad onKeypad={(key) => {
          const nextState = calculator.nextState(this.state.calculator, key)
          if (nextState.tape) {
            const newTape = this.state.tape.concat(nextState.tape)
            this.setState({tape: this.state.tape.concat(nextState.tape)})
            this.saveTape(newTape)
          }
          this.setState({calculator: nextState})
        }} />
        <hr />
        <Tape tape={this.state.tape} />
      </div>
    )
  }
}
