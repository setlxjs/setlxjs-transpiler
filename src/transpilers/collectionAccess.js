export default function collectionAccess({ accessor }, transpile) {
  return `[${transpile(accessor)}]`;
}
