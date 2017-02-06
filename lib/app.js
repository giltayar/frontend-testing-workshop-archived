const ReactDOM = require('react-dom')
const React = require('react')
const e = React.createElement
const App = require('./calculator-app')

ReactDOM.render(e(App), document.getElementById('main'))
