import parse from './parse';
import createTranspiler from './createTranspiler';

export default function transpiler(fileContent, plugins) {
  const syntaxTree = parse(fileContent);
  return createTranspiler(plugins)(syntaxTree);
}
