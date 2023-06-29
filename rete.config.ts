/* eslint-disable @typescript-eslint/naming-convention */
import resolve from '@rollup/plugin-node-resolve'
import { ReteOptions } from 'rete-cli'
import scss from 'rollup-plugin-scss'
import svelte from 'rollup-plugin-svelte'

export default <ReteOptions>{
  input: 'src/index.ts',
  name: 'SvelteRenderPlugin',
  globals: {
    'rete': 'Rete',
    'rete-area-plugin': 'ReteAreaPlugin',
    'rete-render-utils': 'ReteRenderUtils'
  },
  nodeResolve: {
    browser: true
  },
  plugins: [
    svelte({
      // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
      preprocess: require('svelte-preprocess')()
    }),
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte']
    }),
    scss({
      insert: true
    })
  ]
}
