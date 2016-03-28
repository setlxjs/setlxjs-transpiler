export default function indent(amount, string) {
  if (!amount) {
    return string;
  }

  let ind = ' ';
  for (let index = 1; index < amount; index++) {
    ind += ' ';
  }

  return ind + string.split('\n').join('\n' + ind);
}
