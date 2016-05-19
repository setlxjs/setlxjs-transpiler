import { CALL, ASSIGNABLE_LIST } from '../constants/tokens';

export default function assignment({ receiver, expression }, transpile) {
  if (receiver.token === CALL) {
    const realReceiver = transpile(receiver.receiver);
    const accessor = transpile(receiver.call.accessor);

    return `${realReceiver} = ${realReceiver}.set(${accessor}, ${transpile(expression)})`;
  }
  if (receiver.token === ASSIGNABLE_LIST) {
    return transpile(receiver) + ' = ' + transpile(expression) + '.toArray()';
  }
  return transpile(receiver) + ' = ' + transpile(expression);
}
