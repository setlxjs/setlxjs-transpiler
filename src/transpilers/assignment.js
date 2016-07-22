import { CALL, ASSIGNABLE_LIST } from '../constants/tokens';

export default function assignment({ receiver, expression }, transpile, plugins) {
  // assigning to lists in immutable.js
  if (receiver.token === CALL) {
    const realReceiver = transpile(receiver.receiver);
    const accessor = transpile(receiver.call.accessor);

    return `${realReceiver} = ${realReceiver}.set(${accessor}, ${transpile(expression)})`;
  }
  if (receiver.token === ASSIGNABLE_LIST) {
    receiver.assignables.forEach(assignable => {
      if (!plugins.stdLibPlugin.isStd(assignable.name)) {
        plugins.scopePlugin.register(assignable.name);
      }
    });
    return transpile(receiver) + ' = ' + transpile(expression) + '.toArray()';
  }
  if (!plugins.stdLibPlugin.isStd(receiver.name)) {
    plugins.scopePlugin.register(receiver.name);
  }
  return transpile(receiver) + ' = ' + transpile(expression);
}
