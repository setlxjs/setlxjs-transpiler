# SetlX.js

A SetlX to Javascript Transpiler.

This is the transpiler for SetlX.js. To use the transpiler see the [command line interface](https://github.com/setlxjs/setlxjs-cli).

_This Software is work in progress_

## Developers guide

### Setting up the Environment

Clone the Repository

```
git clone https://github.com/setlxjs/setlxjs-transpiler.git
cd setlxjs-transpiler
```

Install dependencies
```
npm install
```

Install Gulp if you haven't already
```
npm install -g gulp
```

Compile the files with Gulp
```
gulp
```

Or let Gulp watch for changes
```
gulp watch
```

### Running the tests

Make sure you compiled the latest version of your source code with `gulp` (see above).
SetlX.js uses Mocha to run the tests. To use Mocha install it globally or run the local version instead (leave out `node_modules/.bin/` for global):

Test the parser againt various SetlX programs.
```
node_modules/.bin/mocha test/grammar/parser.test.js
```

Test the generated syntax tree.
```
node_modules/.bin/mocha test/syntaxtree/*.test.js
```
