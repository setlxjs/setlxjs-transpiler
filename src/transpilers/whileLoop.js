export default function whileLoop({ block, expression }, transpile) {
  return `while (${transpile(expression)}) {\n${transpile(block)}}`;
}
