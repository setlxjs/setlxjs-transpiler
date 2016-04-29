export default function call({ receiver, call: innerCall }, transpile) {
  return transpile(receiver) + transpile(innerCall);
}
