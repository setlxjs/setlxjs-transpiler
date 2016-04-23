export default function( type, func ) {
  return tree => {
    if ( tree.token === type ) {
      return func( tree );
    }
    return tree;
  };
}
