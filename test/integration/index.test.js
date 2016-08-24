const fs = require('fs');
const path = require('path');
const hlp = require('setlxjs-lib/dist/hlp');
const std = require('setlxjs-lib/dist/std');

const HelperPlugin = require('../../build/plugins/HelperPlugin');
const StdLibPlugin = require('../../build/plugins/StdLibPlugin').default;

const transpile = require('../../index');

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    });
  });
}

const hackedStdLib = Object.assign(new StdLibPlugin(), {
  imports() {
    return this.imps.filter(imp => imp.varName !== 'print').map(
      imp => `var ${imp.varName} = $$stdLib.${imp.importName};`
    ).join('\n');
  },
});

const hackedHelper = Object.assign(new HelperPlugin(), {
  imports() {
    return this.imps.map(
      imp => `var ${imp.varName} = $$hlpLib.${imp.importName};`
    ).join('\n');
  },
});

describe('integration tests', () => {
  const files = [];

  // We want to compare compiled setlX files with matching js files
  const rfiles = fs.readdirSync(path.join(__dirname, 'files')).map(path.parse);

  // Split setlX and JS files
  const setlx = rfiles
    .filter(file => file.ext === '.stlx')
    .map(file => file.name);
  const txt = rfiles
    .filter(file => file.ext === '.txt')
    .map(file => file.name);

  // add files to list, when both - setlX and JS - are present
  setlx.forEach(fileName => {
    if (txt.indexOf(fileName) >= 0) {
      files.push(fileName);
    }
  });

  files.forEach(file => {
    it('should run ' + file + ' correctly', () => {
      const read = readFile(path.join(__dirname, 'files', file + '.txt'))
        .then(s => s.replace(/\r\n/g, '\n'));
      const programm = readFile(path.join(__dirname, 'files', file + '.stlx'))
        .then(code =>
          transpile(code, {
            plugins: {
              stdLibPlugin: hackedStdLib,
              helperPlugin: hackedHelper,
            },
          })
        )
        .then(setlxcode => {
          let output = '';
          const print = str => { output += str + '\n'; };
          // eslint-disable-next-line no-new-func
          const code = new Function('$$stdLib', '$$hlpLib', 'print', setlxcode);
          code(std, hlp, print);
          return output;
        });

      return Promise.all([programm, read]).then(([actual, expected]) => {
        actual.should.equal(expected);
      });
    });
  });
});
