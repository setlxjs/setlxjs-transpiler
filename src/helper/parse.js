import { parse } from './grammar/grammarPure';

export default function transpiler( fileContent ) {
  parse( fileContent );
}
