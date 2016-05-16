export default function exponential({ lefthand, righthand }, transpile) {
  return `Math.pow(${transpile(lefthand)}, ${transpile(righthand)})`;
}
