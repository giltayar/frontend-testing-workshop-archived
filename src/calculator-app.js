const React = require('react')
const CalculatorComponent = require('./calculator-component')
const Tape = require('./tape')

const tapeApiUrl = process.env.NODE_ENV === 'production' ? '/tape' : 'http://localhost:3001/tape'

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {tape: []}
  }

  async componentDidMount () {
    const response = await fetch(tapeApiUrl)
    if (response.ok) {
      const tape = await response.json()
      this.setState({tape})
    } else {
      this.setState({tape: ['error loadig tape!']})
    }
  }

  async changeTape (tape) {
    this.setState({tape})
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
        <CalculatorComponent onTape={tape => this.changeTape(this.state.tape.concat(tape))} />
        <hr />
        <Tape tape={this.state.tape} />
      </div>
    )
  }
}
