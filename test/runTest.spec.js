import esbuild from 'esbuild';
import { babelFlowPlugin } from '../src/index';
import assert from 'assert/strict';

test('strips flow annotations from flow code', async function () {
	const output = await esbuild.build({
		entryPoints: ['example.flow.js'],
		write: false,
		plugins: [babelFlowPlugin()],
		bundle: true,
	});

	const bundle = output.outputFiles[0].text;
	expect(bundle).not.toMatch(/: number|: string|: boolean|: \?number/);
});
