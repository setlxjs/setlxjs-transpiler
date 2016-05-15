import parse from './parse';
import createTranspiler from './createTranspiler';

export default function transpiler(fileContent) {
  const syntaxTree = parse(fileContent);
  return createTranspiler()(syntaxTree);
}
