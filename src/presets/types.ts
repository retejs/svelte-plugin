import type { BaseSchemes } from 'rete'
import type { ComponentType } from 'svelte'

import type { SveltePlugin } from '..'

type ComponentProps = Record<string, any> | undefined | void | null
type RenderResult = { component: ComponentType, props: ComponentProps } | undefined | void | null

export type RenderPreset<Schemes extends BaseSchemes, T> = {
  attach?: (plugin: SveltePlugin<Schemes, T>) => void
  update: (context: Extract<T, { type: 'render' }>, plugin: SveltePlugin<Schemes, T>) => ComponentProps
  render: (context: Extract<T, { type: 'render' }>, plugin: SveltePlugin<Schemes, T>) => RenderResult
}
