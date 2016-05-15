export default function identifier({ name }, transpile, { scopePlugin, stdLibPlugin }) {
  if (!stdLibPlugin.isStd(name)) {
    scopePlugin.register(name);
  }
  return name;
}
