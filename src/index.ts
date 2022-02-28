import * as esbuild from 'esbuild';
import babel from '@babel/core';
import fs from 'fs/promises';

type PluginFactorType = () => esbuild.Plugin;

export const babelFlowPlugin: PluginFactorType = () => {
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
				});
				const codeWithFlow = await fs.readFile(args.path, 'utf-8');
				if (!opts) {
					return { contents: codeWithFlow };
				}
				let transformedCode: babel.BabelFileResult | null = {};
				try {
					transformedCode = await babel.transformAsync(codeWithFlow, opts);
				} catch (error: any) {
					console.log(error.message);
				}
				return {
					contents: transformedCode?.code || '',
				};
			});
		},
	};
};
