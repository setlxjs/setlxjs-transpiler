export default function collectionAccess({ accessor }, transpile) {
  return `.get(${transpile(accessor)})`;
}
