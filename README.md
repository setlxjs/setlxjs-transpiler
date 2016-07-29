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

Compile the files with Gulp (via npm script)
```
npm run build
```

Or let Gulp watch for changes (via npm script)
```
npm run watch
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

### Testing your code in action

__If you are on Unix use the [gist](https://gist.github.com/hendrikniemann/f666bc027e6ed10af9f918d2008a6e12) to setup the project!__

Create the following folder structure by cloning all repositories into the same folder
```
setlxjs
|-setlxjs-cli
|-setlxjs-lib
'-setlxjs-transpiler
```

Install dependencies in every packages. Then switch into `setlxjs-cli` and [link](https://docs.npmjs.com/cli/link) the other packages:
```
npm link ../setlxjs-lib
npm link ../setlxjs-transpiler
```

This creates links to your projects as if your newest version is installed as a dependency and only has to be done once. Make sure to run the build process _every_ time you test your changes (`npm run build`, `npm run watch`).

You can then use the command line transpiler:
```
node index.js c <file>
# OR
node index.js run <file>
```

I usually have the `.stlx` files I am testing directly inside of the `setlxjs-cli` folder. The library is installed and linked there already.
