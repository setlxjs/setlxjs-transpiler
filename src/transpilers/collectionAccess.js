export default function collectionAccess({ accessor }, transpile) {
  return `.get(${transpile(accessor)} < 0 ? ${transpile(accessor)} : ${transpile(accessor)} - 1)`;
}
