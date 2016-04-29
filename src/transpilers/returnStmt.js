export default function returnStmt({ expression }, transpile) {
  return `return ${transpile(expression)};`;
}
