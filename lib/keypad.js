const React = require('react')
const e = React.createElement

module.exports = ({onKeypad}) => {
  const numeric = digit => e('td', {onClick: () => onKeypad(digit)}, digit)
  const operator = operator => e('td', {onClick: () => onKeypad(operator), className: 'operator'}, operator)

  return e('table', null,
    e('tbody', null,
      e('tr', null,
        numeric('7'),
        numeric('8'),
        numeric('9'),
        operator('/')),
      e('tr', null,
        numeric('4'),
        numeric('5'),
        numeric('6'),
        operator('*')),
      e('tr', null,
        numeric('1'),
        numeric('2'),
        numeric('3'),
        operator('-')),
      e('tr', null,
        e('td', null, ''),
        numeric('0'),
        operator('+'),
        operator('='))))
}
