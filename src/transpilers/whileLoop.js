import indent from '../util/indent';

export default function whileLoop({ block, expression }, transpile) {
  return `while (${transpile(expression)}) {\n${indent(2, transpile(block))}}`;
}
