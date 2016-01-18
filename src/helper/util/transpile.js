import transpilers from '../transpilers';

export default function transpile( tree ) {
  let result = false;

  for (const transpiler of transpilers) {
    result = transpiler( tree );

    if (typeof result === 'string') {
      return result;
    }
  }

  console.log(tree);
  throw new Error(`Could not find transpiler for token type ${ tree.token }`);
}
