import babel from '@babel/core';
import fs from 'fs/promises';

export const babelFlowPlugin = () => {
	return {
		name: 'esbuild-plugin-babel-flow',
		setup(build) {
			build.onLoad({ filter: /.*/, namespace: '' }, async (args) => {
				const opts = babel.loadOptions({
					filename: args.path,
					caller: {
						name: 'esbuild-plugin-babel-flow',
						supportsStaticESM: true,
					},
					presets: ['@babel/preset-flow'],
				});
				const codeWithFlow = await fs.readFile(args.path, 'utf-8');
				if (!opts) {
					return { contents: codeWithFlow };
				}
				let transformedCode = {};
				try {
					transformedCode = await babel.transformAsync(codeWithFlow, opts);
				} catch (error) {
					console.log(error.message);
				}
				return {
					contents: transformedCode.code || '',
				};
			});
		},
	};
};
