const React = require('react')

module.exports = ({tape}) =>
  <div className='tape'>
    {tape.map((line, i) => <div className='tape-line' key={i}>{line}</div>)}
  </div>
