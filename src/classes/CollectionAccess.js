import { COLLECTION_ACCESS } from '../constants/tokens';

class CollectionAccess {
  constructor(accessor) {
    this.token = COLLECTION_ACCESS;
    this.accessor = accessor;
  }

  toString() {
    return `CollectionAccess( ${this.accessor} )`;
  }
}

export default function creator(accessor) {
  return new CollectionAccess(accessor);
}
