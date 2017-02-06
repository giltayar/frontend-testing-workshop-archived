const React = require('react')
const e = React.createElement

module.exports = ({onKeypad}) =>
  e('table', null,
    e('tbody', null,
      e('tr', null,
        e('td', {onClick: () => onKeypad('7')}, '7'),
        e('td', {onClick: () => onKeypad('8')}, '8'),
        e('td', {onClick: () => onKeypad('9')}, '9'),
        e('td', {onClick: () => onKeypad('/')}, '/')),
      e('tr', null,
        e('td', {onClick: () => onKeypad('4')}, '4'),
        e('td', {onClick: () => onKeypad('5')}, '5'),
        e('td', {onClick: () => onKeypad('6')}, '6'),
        e('td', {onClick: () => onKeypad('*')}, '*')),
      e('tr', null,
        e('td', {onClick: () => onKeypad('1')}, '1'),
        e('td', {onClick: () => onKeypad('2')}, '2'),
        e('td', {onClick: () => onKeypad('3')}, '3'),
        e('td', {onClick: () => onKeypad('-')}, '-')),
      e('tr', null,
        e('td', null, ''),
        e('td', {onClick: () => onKeypad('0')}, '0'),
        e('td', { onClick: () => onKeypad('+') }, '+')),
        e('td', { onClick: () => onKeypad('=') }, '='))))
