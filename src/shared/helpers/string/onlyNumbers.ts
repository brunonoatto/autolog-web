export default function onlyNumbers(value: string = '') {
  return value.match(/\d+/g)?.join('') || '';
}
