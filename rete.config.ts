import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import { ReteOptions } from 'rete-cli'
import scss from 'rollup-plugin-scss'
import svelte from 'rollup-plugin-svelte'

const buildVariants = [
  {
    key: 'svelte3-4',
    output: '.'
  }, {
    key: 'svelte5.svelte',
    output: '5'
  }
]

export default buildVariants.map(({ key, output }) => (<ReteOptions>{
  input: 'src/index.ts',
  output,
  name: 'ReteSveltePlugin',
  globals: {
    'rete': 'Rete',
    'rete-area-plugin': 'ReteAreaPlugin',
    'rete-render-utils': 'ReteRenderUtils'
  },
  nodeResolve: {
    browser: true
  },
  plugins: [
    replace({
      'process.env.COMPAT': `./compat/${key}`
    }),
    svelte({
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
}))
