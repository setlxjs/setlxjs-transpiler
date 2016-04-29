import parse from './parse';
import transpile from './transpile';

export default function transpiler(fileContent) {
  const syntaxTree = parse(fileContent);
  return transpile(syntaxTree);
}
