import { parse } from './grammar/grammar';

export default function parser( fileContent ) {
  return parse( fileContent );
}
