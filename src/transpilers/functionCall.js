export default function functionCall({ parameters }, transpile) {
  return `(${parameters.map(transpile).join(', ')})`;
}
