const mapper = ind => line => {
  if (line === '') {
    return '';
  }
  return ind + line;
};

export default function indent(amount, string) {
  if (!amount) {
    return string;
  }

  let ind = ' ';
  for (let index = 1; index < amount; index++) {
    ind += ' ';
  }

  return string.split('\n').map(mapper(ind)).join('\n');
}
