export default function identifier({ name }, transpile, { stdLibPlugin }) {
  stdLibPlugin.isStd(name);
  return name;
}
