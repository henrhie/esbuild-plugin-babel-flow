import * as esbuild from 'esbuild';

(async function () {
	await esbuild.build({
		entryPoints: ['src/index.js'],
		write: true,
		bundle: true,
		outdir: 'dist',
		platform: 'node',
	});
})();
