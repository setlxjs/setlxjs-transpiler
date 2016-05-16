export default function returnStmt({ expression }, transpile) {
  return expression ? `return ${transpile(expression)};` : 'return;';
}
