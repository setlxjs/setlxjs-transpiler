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
SetlX.js uses Mocha to run the tests. To run the tests simply use the `npm test` command:
```
npm test
```

### Linting the code

Please run the linter and make sure no errors occur before sending in a pull request:
```
npm run lint
```

### Transpiler in Action (will be removed)

If you have compiled the `src` directory as described above you can use the transpiler to output a transpiled file to the stdout:

```
node index.js <file>
```

For example you can transpile the `prime-sieve.stlx` in the repo!

```
node index.js test/grammar/programs/prime-sieve.stlx
```
