import { parse } from './grammar/grammar'; // eslint-disable-line import/no-unresolved

export default function parser(fileContent) {
  try {
    return parse(fileContent);
  } catch (error) {
    if (error.name === 'SyntaxError') {
      error.message = error.message.replace(/\.$/, '') +
        ` in line ${error.line}:${error.column}.`;
      throw error;
    }
    throw error;
  }
}
