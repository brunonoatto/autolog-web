// https://www.30secondsofcode.org/js/s/join-url-segments/
const urlJoin = (...args: (string | number)[]) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/') // eslint-disable-line no-useless-escape
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?')
    .replace(/\/$/, ''); // remove a barra no final se tiver

export default urlJoin;
