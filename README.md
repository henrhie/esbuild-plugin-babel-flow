# esbuild-plugin-babel-flow

Esbuild plugin for transformation of code with [Flow](https://flow.org/) annotations

<br>

Esbuild plugins have limitations to allow developers to hook into every part of the bundling process. This is a deliberate attempt to prevent creating performance bottlenecks during bundling.
Thankfully, Babel, a javascript code transformer allows use to transform code during the code loading event of the esbuild bundling process.
esbuild-plugin-babel-flow under the hood uses babel's transform api to strip javascript code of flow annotations for safe execution in a javascript environment.

## Install

```bash
npm install esbuild-plugin-babel-flow --save-dev
```

<br>

## Usage

config file
`esbuild.config.js`

```js
esbuild
	.build({
		entryPoints: ['example.flow.js'],
		write: true,
		bundle: true,
		outdir: 'dist',
		plugins: [babelFlowPlugin()],
	})
	.catch(() => process.exit(1));
```

input file
`example.flow.js`

```js
// @flow

function foo(x: ?number): string {
	if (x) {
		return JSON.stringify(x);
	}
	return 'default string';
}

foo(55);
```

bundled output
`dist/example.flow.js`

```js
(() => {
	// example.flow.js
	function foo(x) {
		if (x) {
			return JSON.stringify(x);
		}
		return 'default string';
	}
	foo(55);
})();
```

`package.json`

```json
{
	"type": "module",
	"scripts": {
		"start": "node esbuild.config.js"
	}
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
