import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import externalGlobals from 'rollup-plugin-external-globals';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const svgIconOptions = {
  input: 'src/svgIcon.ts', // our source file
  output: {
    file: 'dist/svgIcon.min.js',
    format: 'iife',
    name: 'SvgIcon',
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    externalGlobals({
      '@material-ui/core': 'MaterialUI',
    }),
    terser(), // minifies generated bundles
  ],
};

const iconOptions = {
  input: 'src/index.ts', // our source file
  output: {
    file: pkg.main,
    format: 'iife',
    name: 'MuiIcons',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    nodeResolve(),
    typescript({
      typescript: require('typescript'),
    }),
    externalGlobals({
      react: 'React',
      '@material-ui/core/SvgIcon': 'SvgIcon',
    }),
    terser(), // minifies generated bundles
  ],
};

export default [svgIconOptions, iconOptions];
