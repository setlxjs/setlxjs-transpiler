export default function exponential({ lefthand, righthand }, transpile, { helperPlugin }) {
  return `${helperPlugin.request('pow')}(${transpile(lefthand)}, ${transpile(righthand)})`;
}
