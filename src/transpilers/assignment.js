import { CALL, ASSIGNABLE_LIST, PROCEDURE } from '../constants/tokens';

export default function assignment({ receiver, expression }, transpile) {
  // lists have to be assigned with .set because immutable.js
  if (receiver.token === CALL) {
    const realReceiver = transpile(receiver.receiver);
    const accessor = transpile(receiver.call.accessor);

    return `${realReceiver} = ${realReceiver}.set(${accessor}, ${transpile(expression)})`;
  }
  if (receiver.token === ASSIGNABLE_LIST) {
    return transpile(receiver) + ' = ' + transpile(expression) + '.toArray()';
  }
  if (expression.token === PROCEDURE) {
    // this is a bit hacky, we remove the "function" of the declarion to insert the identifier
    // in between...
    const proc = transpile(expression).substr(8);
    return 'function ' + transpile(receiver) + proc;
  }
  return transpile(receiver) + ' = ' + transpile(expression);
}
